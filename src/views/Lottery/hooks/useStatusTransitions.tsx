import { useWeb3React } from '@web3-react/core'
import { LotteryStatus } from 'config/constants/types'
import usePreviousValue from 'hooks/usePreviousValue'
import { useEffect } from 'react'
import { useAppDispatch } from 'state'
import { useLottery } from 'state/lottery/hooks'
import { fetchPublicLotteries, fetchCurrentLotteryId, fetchUserLotteries } from 'state/lottery'

const useStatusTransitions = () => {
  const {
    currentLotteryId,
    isTransitioning,
    currentRound: { status },
  } = useLottery()

  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const previousStatus = usePreviousValue(status)

  useEffect(() => {
    // Only run if there is a status state change
    if (previousStatus !== status && currentLotteryId) {
      // Current lottery transitions from CLOSE > CLAIMABLE
      if (previousStatus === LotteryStatus.CLOSE && status === LotteryStatus.CLAIMABLE) {
        dispatch(fetchPublicLotteries({ currentLotteryId, chainId }))
        if (account) {
          dispatch(fetchUserLotteries({ account, currentLotteryId, chainId }))
        }
      }
      // Previous lottery to new lottery. From CLAIMABLE (previous round) > OPEN (new round)
      if (previousStatus === LotteryStatus.CLAIMABLE && status === LotteryStatus.OPEN) {
        dispatch(fetchPublicLotteries({ currentLotteryId, chainId }))
        if (account) {
          dispatch(fetchUserLotteries({ account, currentLotteryId, chainId }))
        }
      }
    }
  }, [currentLotteryId, status, previousStatus, account, dispatch, chainId])

  useEffect(() => {
    // Current lottery is CLAIMABLE and the lottery is transitioning to a NEW round - fetch current lottery ID every 10s.
    // The isTransitioning condition will no longer be true when fetchCurrentLotteryId returns the next lottery ID
    dispatch(fetchCurrentLotteryId({ chainId }))
    if (previousStatus === LotteryStatus.CLAIMABLE && status === LotteryStatus.CLAIMABLE && isTransitioning) {
      dispatch(fetchPublicLotteries({ currentLotteryId, chainId }))
      const interval = setInterval(async () => {
        dispatch(fetchCurrentLotteryId({ chainId }))
        dispatch(fetchPublicLotteries({ currentLotteryId, chainId }))
      }, 10000)
      return () => clearInterval(interval)
    }
    return () => null
  }, [status, previousStatus, isTransitioning, currentLotteryId, dispatch, chainId])
}

export default useStatusTransitions
