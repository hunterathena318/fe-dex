import { useWeb3React } from '@web3-react/core'
import { FetchStatus } from 'config/constants/types'
import useSWR from 'swr'
import { getAddress } from 'utils/addressHelpers'
import { getActivePools } from 'utils/calls'
import { simpleRpcProvider } from 'utils/providers'
import getProvider from 'utils/getProvider'
import { getVotingPower } from '../helpers'

interface State {
  cakeBalance: number
  cakeVaultBalance: number
  cakePoolBalance: number
  poolsBalance: number
  cakeBnbLpBalance: number
  ifoPoolBalance: number
  total: number
}

const useGetVotingPower = (block?: number, isActive = true): State & { isLoading: boolean; isError: boolean } => {
  const { account, chainId } = useWeb3React()
  const { data, status, error } = useSWR(account && isActive ? [account, block, 'votingPower'] : null, async () => {
    const provider = getProvider(chainId)
    const blockNumber = block || (await provider.getBlockNumber())
    const eligiblePools = await getActivePools(chainId, blockNumber)
    const poolAddresses = eligiblePools.map(({ contractAddress }) => getAddress(contractAddress))
    const { cakeBalance, cakeBnbLpBalance, cakePoolBalance, total, poolsBalance, cakeVaultBalance, IFOPoolBalance } =
      await getVotingPower(account, poolAddresses, blockNumber)
    return {
      cakeBalance: parseFloat(cakeBalance),
      cakeBnbLpBalance: parseFloat(cakeBnbLpBalance),
      cakePoolBalance: parseFloat(cakePoolBalance),
      poolsBalance: parseFloat(poolsBalance),
      cakeVaultBalance: parseFloat(cakeVaultBalance),
      ifoPoolBalance: IFOPoolBalance ? parseFloat(IFOPoolBalance) : 0,
      total: parseFloat(total),
    }
  })
  if (error) console.error(error)

  return { ...data, isLoading: status !== FetchStatus.Fetched, isError: status === FetchStatus.Failed }
}

export default useGetVotingPower
