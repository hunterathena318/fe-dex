import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useSwitchNetwork from 'hooks/useSelectNetwork'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { fetchUserNetwork } from 'state/network'
import { State } from 'state/types'

// Network

export const useNetworkChainId = (): number => {
  const chainId = useSelector((state: State) => state.network.data.chainId)
  return chainId
}

export const useNetworkChainIdFromUrl = (): boolean => {
  const chainIdFromUrl = useSelector((state: State) => state.network.data.chainIdFromUrl)
  return chainIdFromUrl
}

export const useUpdateNetwork = () => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const appChainId = useNetworkChainId()
  const chainIdFromUrl = useNetworkChainIdFromUrl()
  const { switchNetwork } = useSwitchNetwork()
  useEffect(() => {
    if (chainIdFromUrl) {
      switchNetwork(appChainId)
    } else {
      dispatch(fetchUserNetwork(chainId, account, appChainId))
    }
  }, [chainId, account, appChainId, chainIdFromUrl, switchNetwork, dispatch])
}
