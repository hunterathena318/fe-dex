import { LotteryV2 } from 'config/abi/types'
import { TICKET_LIMIT_PER_REQUEST } from 'config/constants/lottery'
import { LotteryTicket } from 'config/constants/types'
import { getLotteryV2Contract } from 'utils/contractHelpers'

export const processRawTicketsResponse = (
  ticketsResponse: Awaited<ReturnType<LotteryV2['viewUserInfoForLotteryId']>>,
): LotteryTicket[] => {
  const [ticketIds, ticketNumbers, ticketStatuses] = ticketsResponse

  if (ticketIds?.length > 0) {
    return ticketIds.map((ticketId, index) => {
      return {
        id: ticketId.toString(),
        number: ticketNumbers[index].toString(),
        status: ticketStatuses[index],
      }
    })
  }
  return []
}

export const viewUserInfoForLotteryId = async (
  account: string,
  lotteryId: string,
  cursor: number,
  perRequestLimit: number,
  chainId: number,
): Promise<LotteryTicket[]> => {
  try {
    const lotteryContract = getLotteryV2Contract(chainId)
    const data = await lotteryContract.viewUserInfoForLotteryId(account, lotteryId, cursor, perRequestLimit)
    return processRawTicketsResponse(data)
  } catch (error) {
    console.error('viewUserInfoForLotteryId', error)
    return null
  }
}

export const fetchUserTicketsForOneRound = async (
  account: string,
  lotteryId: string,
  chainId: number,
): Promise<LotteryTicket[]> => {
  let cursor = 0
  let numReturned = TICKET_LIMIT_PER_REQUEST
  const ticketData = []

  while (numReturned === TICKET_LIMIT_PER_REQUEST) {
    // eslint-disable-next-line no-await-in-loop
    const response = await viewUserInfoForLotteryId(account, lotteryId, cursor, TICKET_LIMIT_PER_REQUEST, chainId)
    cursor += TICKET_LIMIT_PER_REQUEST
    numReturned = response.length
    ticketData.push(...response)
  }

  return ticketData
}

export const fetchUserTicketsForMultipleRounds = async (
  idsToCheck: string[],
  account: string,
  chainId: number,
): Promise<{ roundId: string; userTickets: LotteryTicket[] }[]> => {
  const ticketsForMultipleRounds = []
  for (let i = 0; i < idsToCheck.length; i += 1) {
    const roundId = idsToCheck[i]
    // eslint-disable-next-line no-await-in-loop
    const ticketsForRound = await fetchUserTicketsForOneRound(account, roundId, chainId)
    ticketsForMultipleRounds.push({
      roundId,
      userTickets: ticketsForRound,
    })
  }
  return ticketsForMultipleRounds
}
