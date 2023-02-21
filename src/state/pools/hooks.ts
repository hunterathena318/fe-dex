import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchCakeVaultPublicData,
  fetchCakeVaultUserData,
  fetchCakeVaultFees,
  fetchPoolsStakingLimitsAsync,
  fetchIfoPoolFees,
  fetchIfoPoolPublicData,
  fetchIfoPoolUserAndCredit,
  fetchCakePoolPublicDataAsync,
  fetchCakePoolUserDataAsync,
} from '.'
import { DeserializedPool, VaultKey } from '../types'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from '../farms'
import { useCurrentBlock } from '../block/hooks'
import {
  poolsWithUserDataLoadingSelector,
  makePoolWithUserDataLoadingSelector,
  makeVaultPoolByKey,
  poolsWithVaultSelector,
  ifoPoolCreditBlockSelector,
  ifoPoolCreditSelector,
  ifoWithAprSelector,
} from './selectors'

export const useFetchPublicPoolsData = (chainId: number) => {
  const dispatch = useAppDispatch()

  useSlowRefreshEffect(
    (currentBlock) => {
      const fetchPoolsDataWithFarms = async () => {
        const activeFarms = nonArchivedFarms.filter((farm) => farm.pid !== 0)
        await dispatch(fetchFarmsPublicDataAsync({ pids: activeFarms.map((farm) => farm.pid), chainId }))
        batch(() => {
          dispatch(fetchPoolsPublicDataAsync(chainId, currentBlock))
          dispatch(fetchPoolsStakingLimitsAsync(chainId))
        })
      }

      fetchPoolsDataWithFarms()
    },
    [chainId, dispatch],
  )
}

export const useFetchUserPools = (chainId, account) => {
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(chainId, account))
    }
  }, [account, chainId, dispatch])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  return useSelector(poolsWithUserDataLoadingSelector)
}

export const usePool = (sousId: number): { pool: DeserializedPool; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsWithVault = () => {
  return useSelector(poolsWithVaultSelector)
}

export const usePoolsPageFetch = () => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  useFetchPublicPoolsData(chainId)

  useFastRefreshEffect(() => {
    batch(() => {
      dispatch(fetchCakeVaultPublicData({ chainId }))
      dispatch(fetchIfoPoolPublicData({ chainId }))
      if (account) {
        dispatch(fetchPoolsUserDataAsync(chainId, account))
        dispatch(fetchCakeVaultUserData({ account }))
        dispatch(fetchIfoPoolUserAndCredit({ account, chainId }))
      }
    })
  }, [account, chainId, dispatch])

  useEffect(() => {
    batch(() => {
      dispatch(fetchIfoPoolFees({ chainId }))
      dispatch(fetchCakeVaultFees({ chainId }))
    })
  }, [chainId, dispatch])
}

export const useFetchIfoPool = (fetchCakePool = true) => {
  const { account, chainId } = useWeb3React()
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    batch(() => {
      if (fetchCakePool) {
        if (account) {
          dispatch(fetchCakePoolUserDataAsync(chainId, account))
        }
        dispatch(fetchCakePoolPublicDataAsync(chainId))
      }
      if (account) {
        dispatch(fetchIfoPoolUserAndCredit({ account, chainId }))
      }
      dispatch(fetchIfoPoolPublicData({ chainId }))
    })
  }, [dispatch, account, fetchCakePool, chainId])

  useEffect(() => {
    dispatch(fetchIfoPoolFees({ chainId }))
  }, [chainId, dispatch])
}

export const useCakeVault = () => {
  return useVaultPoolByKey(VaultKey.CakeVault)
}

export const useVaultPools = () => {
  const cakeVault = useVaultPoolByKey(VaultKey.CakeVault)
  const ifoVault = useVaultPoolByKey(VaultKey.IfoPool)
  const vaults = useMemo(() => {
    return {
      [VaultKey.CakeVault]: cakeVault,
      [VaultKey.IfoPool]: ifoVault,
    }
  }, [cakeVault, ifoVault])
  return vaults
}

export const useVaultPoolByKey = (key: VaultKey) => {
  const vaultPoolByKey = useMemo(() => makeVaultPoolByKey(key), [key])
  return useSelector(vaultPoolByKey)
}

export const useIfoPoolVault = () => {
  return useVaultPoolByKey(VaultKey.IfoPool)
}

export const useIfoPoolCreditBlock = () => {
  const currentBlock = useCurrentBlock()
  const { creditStartBlock, creditEndBlock } = useSelector(ifoPoolCreditBlockSelector)
  const hasEndBlockOver = currentBlock >= creditEndBlock
  return { creditStartBlock, creditEndBlock, hasEndBlockOver }
}

export const useIfoPoolCredit = () => {
  return useSelector(ifoPoolCreditSelector)
}

export const useIfoWithApr = () => {
  return useSelector(ifoWithAprSelector)
}
