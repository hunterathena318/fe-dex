import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'

import { setBlock } from '.'
import { State } from '../types'

export const usePollBlockNumber = (refreshTime = 10000) => {
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()
  const { library, chainId } = useActiveWeb3React()

  const fetchBlock = useCallback(async () => {
    try {
      const blockNumber = await library.getBlockNumber()

      dispatch(setBlock(blockNumber))
    } catch {
      console.error('Could not fetch block number')
    }
  }, [dispatch, library])

  useEffect(() => {
    fetchBlock()
  }, [chainId, fetchBlock])

  useInterval(
    () => {
      fetchBlock()
    },
    refreshTime,
    isWindowVisible,
  )
}

export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useCurrentBlock = () => {
  return useSelector((state: State) => state.block.currentBlock)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
