import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ExpandableLabel,
  Flex,
  Heading,
  Skeleton,
  Text,
  useModal,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import Balance from 'components/Balance'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { useState, useEffect } from 'react'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { getPriceGemuniBusd } from 'state/lottery/getLotteriesData'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { dateTimeOptions } from '../helpers'
import BuyTicketsButton from './BuyTicketsButton'
import RewardBrackets from './RewardBrackets'
import ViewTicketsModal from './ViewTicketsModal'

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-column-gap: 32px;
    grid-template-columns: auto 1fr;
  }
`

const StyledCard = styled(Card)`
  & div,
  h2,
  span {
    font-family: 'Inter';
  }
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 520px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 1113px;
  }
`

const NextDrawWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
`
const CustomBuyTicketButton = styled(BuyTicketsButton)`
  background: linear-gradient(90.84deg, #fe2900 -3.26%, #ffa500 105.1%);
  width: 274px;
  border-radius: 100px;
  margin: 0 auto;
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0;
  }
`
const CustomText = styled.div`
  div {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    div {
      font-size: 24px;
    }
  }
`
const CustomFlexPrice = styled(Flex)`
  span {
    background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const NextDrawCard = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { account } = useWeb3React()
  const { currentLotteryId, isTransitioning, currentRound } = useLottery()
  const { endTime, amountCollectedInCake, userTickets, status } = currentRound

  const [onPresentViewTicketsModal] = useModal(<ViewTicketsModal roundId={currentLotteryId} roundStatus={status} />)
  const [isExpanded, setIsExpanded] = useState(false)
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning
  const [cakePriceBusd, setCakePriceBusd] = useState<BigNumber>()

  // const cakePriceBusd = usePriceCakeBusd()
  // const cakePriceBusd = getPriceGemuniBusd()
  const prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  const endTimeMs = parseInt(endTime, 10) * 1000
  const endDate = new Date(endTimeMs)
  const isLotteryOpen = status === LotteryStatus.OPEN
  const userTicketCount = userTickets?.tickets?.length || 0

  useEffect(() => {
    const getPrice = async () => {
      const price = await getPriceGemuniBusd()
      setCakePriceBusd(price)
    }
    getPrice()
  }, [])
  const getPrizeBalances = () => {
    if (status === LotteryStatus.CLOSE || status === LotteryStatus.CLAIMABLE) {
      return (
        <Heading scale="xl" color="secondary" textAlign={['center', null, null, 'left']}>
          {t('Calculating')}...
        </Heading>
      )
    }
    return (
      <>
        {prizeInBusd.isNaN() ? (
          <Skeleton my="7px" height={40} width={160} />
        ) : (
          <Balance
            fontSize="48px"
            color="secondary"
            textAlign={['center', null, null, 'left']}
            paddingTop="50px"
            paddingBottom="20px"
            lineHeight="1"
            bold
            prefix="~ $ "
            value={getBalanceNumber(prizeInBusd)}
            decimals={0}
          />
        )}
      </>
    )
  }
  const getNextDrawId = () => {
    if (status === LotteryStatus.OPEN) {
      return `${currentLotteryId} |`
    }
    if (status === LotteryStatus.PENDING) {
      return ''
    }
    return parseInt(currentLotteryId, 10) + 1
  }

  const getNextDrawDateTime = () => {
    if (status === LotteryStatus.OPEN) {
      return `${t('Draw')}: ${endDate.toLocaleString(locale, dateTimeOptions)}`
    }
    return ''
  }

  const ticketRoundText =
    userTicketCount > 1
      ? t('You have %amount% tickets this round', { amount: userTicketCount })
      : t('You have %amount% ticket this round', { amount: userTicketCount })
  const [youHaveText, ticketsThisRoundText] = ticketRoundText.split(userTicketCount.toString())

  return (
    <StyledCard>
      <CardHeader p="16px 24px">
        <Flex justifyContent="space-between">
          <Heading mr="12px" fontSize="18px">
            {t('Next Draw')}
          </Heading>
          <Text>
            {currentLotteryId && `#${getNextDrawId()}`} {Boolean(endTime) && getNextDrawDateTime()}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Grid>
          <Flex justifyContent={['flex-start', null, null, 'flex-start']}>
            <Heading fontSize="24px">{t('Prize Pot')}</Heading>
          </Flex>
          <CustomFlexPrice flexDirection="column" mb="18px">
            {getPrizeBalances()}
          </CustomFlexPrice>
          <Heading scale="lg" fontSize="24px">
            {t('Your tickets')}
          </Heading>

          <Flex mr={[null, null, null, '24px']} flexWrap="wrap" alignItems={['center', null, null, 'flex-start']}>
            {isLotteryOpen && (
              <Flex flexDirection="column">
                {account && (
                  <Flex
                    justifyContent={['center', null, null, 'flex-start']}
                    alignItems="center"
                    mr={[null, null, null, '24px']}
                  >
                    <Heading scale="lg" fontSize="24px" fontWeight="400 !important">
                      {youHaveText}{' '}
                    </Heading>
                    {!userTickets.isLoading ? (
                      <CustomText>
                        <Balance
                          lineHeight={1}
                          value={userTicketCount}
                          decimals={0}
                          display="inline"
                          mx="4px"
                          fontSize="24px"
                          color="#52d6a4"
                        />
                      </CustomText>
                    ) : (
                      <Skeleton mx="4px" height={20} width={40} />
                    )}
                    <Heading scale="lg" fontSize="24px" fontWeight="400 !important">
                      {' '}
                      {ticketsThisRoundText}
                    </Heading>
                  </Flex>
                )}
                {!userTickets.isLoading && userTicketCount > 0 && (
                  <Button
                    style={{
                      fontSize: '20px',
                    }}
                    mt={2}
                    onClick={onPresentViewTicketsModal}
                    height="auto"
                    width="fit-content"
                    p="0"
                    variant="text"
                    scale="sm"
                  >
                    {t('View your tickets')}
                  </Button>
                )}
              </Flex>
            )}
            <CustomBuyTicketButton
              text='Buy Tickets'
              style={{
                transform: 'translateY(-25%)',
                marginLeft: 'auto',
              }}
              disabled={ticketBuyIsDisabled}
              maxWidth="280px"
            />
          </Flex>
        </Grid>
      </CardBody>
      <CardFooter p="0">
        {isExpanded && (
          <NextDrawWrapper>
            <RewardBrackets lotteryNodeData={currentRound} />
          </NextDrawWrapper>
        )}
        {(status === LotteryStatus.OPEN || status === LotteryStatus.CLOSE) && (
          <Flex p="8px 24px" alignItems="center" justifyContent="center">
            <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? t('Hide') : t('Details')}
            </ExpandableLabel>
          </Flex>
        )}
      </CardFooter>
    </StyledCard>
  )
}

export default NextDrawCard
