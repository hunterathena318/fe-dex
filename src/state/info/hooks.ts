import { useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnixTime, startOfHour, Duration, sub } from 'date-fns'
import { AppState, AppDispatch } from 'state'
import { isAddress } from 'utils'
import { Transaction } from 'state/info/types'
import fetchPoolChartData from 'state/info/queries/pools/chartData'
import fetchPoolTransactions from 'state/info/queries/pools/transactions'
import fetchTokenChartData from 'state/info/queries/tokens/chartData'
import fetchTokenTransactions from 'state/info/queries/tokens/transactions'
import fetchTokenPriceData from 'state/info/queries/tokens/priceData'
import fetchPoolsForToken from 'state/info/queries/tokens/poolsForToken'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTimestampInfo } from 'config/constants/endpoints'
import {
  updateProtocolData,
  updateProtocolChartData,
  updateProtocolTransactions,
  updatePoolData,
  addPoolKeys,
  updatePoolChartData,
  updatePoolTransactions,
  updateTokenData,
  addTokenKeys,
  addTokenPoolAddresses,
  updateTokenChartData,
  updateTokenPriceData,
  updateTokenTransactions,
} from './actions'
import { ProtocolData, PoolData, TokenData, ChartEntry, PriceChartEntry } from './types'

// Protocol hooks

export const useProtocolData = (): [ProtocolData | undefined, (protocolData: ProtocolData) => void] => {
  const protocolData: ProtocolData | undefined = useSelector((state: AppState) => state.info.protocol.overview)

  const dispatch = useDispatch<AppDispatch>()
  const setProtocolData: (protocolData: ProtocolData) => void = useCallback(
    (data: ProtocolData) => dispatch(updateProtocolData({ protocolData: data })),
    [dispatch],
  )

  return [protocolData, setProtocolData]
}

export const useProtocolChartData = (): [ChartEntry[] | undefined, (chartData: ChartEntry[]) => void] => {
  const chartData: ChartEntry[] | undefined = useSelector((state: AppState) => state.info.protocol.chartData)
  const dispatch = useDispatch<AppDispatch>()
  const setChartData: (chartData: ChartEntry[]) => void = useCallback(
    (data: ChartEntry[]) => dispatch(updateProtocolChartData({ chartData: data })),
    [dispatch],
  )
  return [chartData, setChartData]
}

export const useProtocolTransactions = (): [Transaction[] | undefined, (transactions: Transaction[]) => void] => {
  const transactions: Transaction[] | undefined = useSelector((state: AppState) => state.info.protocol.transactions)
  const dispatch = useDispatch<AppDispatch>()
  const setTransactions: (transactions: Transaction[]) => void = useCallback(
    (transactionsData: Transaction[]) => dispatch(updateProtocolTransactions({ transactions: transactionsData })),
    [dispatch],
  )
  return [transactions, setTransactions]
}

// Pools hooks

export const useAllPoolData = (
  chainId: number,
): {
  [address: string]: { data?: PoolData }
} => {
  return useSelector((state: AppState) => {
    const res = {}
    const data = state.info.pools[chainId]?.byAddress
    // eslint-disable-next-line
    for (const myKey in data) {
      if (data[myKey].chainId === chainId) {
        res[myKey] = data[myKey]
      }
    }
    return res
  })
}

export const useUpdatePoolData = (): ((pools: PoolData[]) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  return useCallback((pools: PoolData[]) => dispatch(updatePoolData({ pools, chainId })), [dispatch, chainId])
}

export const useAddPoolKeys = (): ((addresses: any[]) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  return useCallback((poolAddresses: any[]) => dispatch(addPoolKeys({ poolAddresses, chainId })), [dispatch, chainId])
}

export const usePoolDatas = (poolAddresses: any[]): PoolData[] => {
  const { chainId } = useActiveWeb3React()
  const allPoolData = useAllPoolData(chainId)
  const addNewPoolKeys = useAddPoolKeys()

  const untrackedAddresses = poolAddresses.reduce((accum: any[], address) => {
    if (!Object.keys(allPoolData).includes(address)) {
      accum.push(address)
    }
    return accum
  }, [])

  useEffect(() => {
    if (untrackedAddresses) {
      addNewPoolKeys(untrackedAddresses)
    }
  }, [addNewPoolKeys, untrackedAddresses])

  const poolsWithData = poolAddresses
    .map((address) => {
      return allPoolData[address]?.data
    })
    .filter((pool) => pool)

  return poolsWithData
}

export const usePoolChartData = (address: string): ChartEntry[] | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const pool = useSelector((state: AppState) => state.info.pools[chainId]?.byAddress[address])
  const chartData = pool?.chartData
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { error: fetchError, data } = await fetchPoolChartData(chainId, address)
      if (!fetchError && data) {
        dispatch(updatePoolChartData({ poolAddress: address, chartData: data, chainId }))
      }
      if (fetchError) {
        setError(fetchError)
      }
    }
    if (!chartData && !error) {
      fetch()
    }
  }, [address, dispatch, error, chartData, chainId])

  return chartData
}

export const usePoolTransactions = (address: string): Transaction[] | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const pool = useSelector((state: AppState) => state.info.pools[chainId]?.byAddress[address])
  const transactions = pool?.transactions
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { error: fetchError, data } = await fetchPoolTransactions(address, chainId)
      if (fetchError) {
        setError(true)
      } else {
        dispatch(updatePoolTransactions({ poolAddress: address, transactions: data, chainId }))
      }
    }
    if (!transactions && !error) {
      fetch()
    }
  }, [address, chainId, dispatch, error, transactions])

  return transactions
}

// Tokens hooks

export const useAllTokenData = (): {
  [address: string]: { data?: TokenData }
} => {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => {
    const res = {}
    const data = state.info.tokens[chainId]?.byAddress
    // eslint-disable-next-line
    for (const myKey in data) {
      if (data[myKey].chainId === chainId) {
        res[myKey] = data[myKey]
      }
    }
    return res
  })
}

export const useUpdateTokenData = (): ((tokens: TokenData[]) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  return useCallback(
    (tokens: TokenData[]) => {
      dispatch(updateTokenData({ tokens, chainId }))
    },
    [chainId, dispatch],
  )
}

export const useAddTokenKeys = (): ((addresses: any[]) => void) => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  return useCallback(
    (tokenAddresses: any[]) => dispatch(addTokenKeys({ tokenAddresses, chainId })),
    [chainId, dispatch],
  )
}

export const useTokenDatas = (addresses?: any[]): TokenData[] | undefined => {
  const allTokenData = useAllTokenData()
  const addNewTokenKeys = useAddTokenKeys()

  // if token not tracked yet track it
  addresses?.forEach((a) => {
    if (!allTokenData[a]) {
      addNewTokenKeys([a])
    }
  })

  const tokensWithData = useMemo(() => {
    if (!addresses) {
      return undefined
    }
    return addresses
      .map((a) => {
        return allTokenData[a]?.data
      })
      .filter((token) => token)
  }, [addresses, allTokenData])

  return tokensWithData
}

export const useTokenData = (address: string | undefined): TokenData | undefined => {
  const allTokenData = useAllTokenData()
  const addNewTokenKeys = useAddTokenKeys()

  if (!address || !isAddress(address)) {
    return undefined
  }

  // if token not tracked yet track it
  if (!allTokenData[address]) {
    addNewTokenKeys([address])
  }

  return allTokenData[address]?.data
}

export const usePoolsForToken = (address: string): any[] | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const token = useSelector((state: AppState) => state.info.tokens[chainId]?.byAddress[address])
  const poolsForToken = token?.poolAddresses
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { error: fetchError, addresses } = await fetchPoolsForToken(address, chainId)
      if (!fetchError && addresses) {
        dispatch(addTokenPoolAddresses({ tokenAddress: address, poolAddresses: addresses, chainId }))
      }
      if (fetchError) {
        setError(fetchError)
      }
    }
    if (!poolsForToken && !error) {
      fetch()
    }
  }, [address, chainId, dispatch, error, poolsForToken])

  return poolsForToken
}

export const useTokenChartData = (address: string): ChartEntry[] | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const token = useSelector((state: AppState) => state.info.tokens[chainId]?.byAddress[address])
  const chartData = token?.chartData
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      const { error: fetchError, data } = await fetchTokenChartData(address, chainId)
      if (!fetchError && data) {
        dispatch(updateTokenChartData({ tokenAddress: address, chartData: data, chainId }))
      }
      if (fetchError) {
        setError(fetchError)
      }
    }
    if (!chartData && !error) {
      fetch()
    }
  }, [address, dispatch, error, chartData, chainId])

  return chartData
}

export const useTokenPriceData = (
  address: string,
  interval: number,
  timeWindow: Duration,
  chainId: number,
): PriceChartEntry[] | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: AppState) => state.info.tokens[chainId]?.byAddress[address])
  const priceData = token?.priceData[interval]
  const [error, setError] = useState(false)

  // construct timestamps and check if we need to fetch more data
  const oldestTimestampFetched = token?.priceData.oldestFetchedTimestamp
  const utcCurrentTime = getUnixTime(new Date(getTimestampInfo(chainId))) * 1000
  const startTimestamp = getUnixTime(startOfHour(sub(utcCurrentTime, timeWindow)))

  useEffect(() => {
    const fetch = async () => {
      const { data, error: fetchingError } = await fetchTokenPriceData(address, interval, startTimestamp, chainId)
      if (data) {
        dispatch(
          updateTokenPriceData({
            tokenAddress: address,
            secondsInterval: interval,
            priceData: data,
            oldestFetchedTimestamp: startTimestamp,
            chainId,
          }),
        )
      }
      if (fetchingError) {
        setError(true)
      }
    }
    if (!priceData && !error) {
      fetch()
    }
  }, [address, chainId, dispatch, error, interval, oldestTimestampFetched, priceData, startTimestamp, timeWindow])

  return priceData
}

export const useTokenTransactions = (address: string): Transaction[] | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  const token = useSelector((state: AppState) => state.info.tokens[chainId]?.byAddress[address])
  const transactions = token?.transactions
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { error: fetchError, data } = await fetchTokenTransactions(address, chainId)
      if (fetchError) {
        setError(true)
      } else if (data) {
        dispatch(updateTokenTransactions({ tokenAddress: address, transactions: data, chainId }))
      }
    }
    if (!transactions && !error) {
      fetch()
    }
  }, [address, chainId, dispatch, error, transactions])

  return transactions
}
