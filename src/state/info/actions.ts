import { createAction } from '@reduxjs/toolkit'
import { Transaction } from 'state/info/types'
import { ProtocolData, TokenData, PoolData, ChartEntry, PriceChartEntry } from './types'

export const updateProtocolData = createAction<{ protocolData: ProtocolData }>('info/protocol/updateProtocolData')
export const updateProtocolChartData = createAction<{ chartData: ChartEntry[] }>(
  'info/protocol/updateProtocolChartData',
)
export const updateProtocolTransactions = createAction<{ transactions: Transaction[] }>(
  'info/protocol/updateProtocolTransactions',
)

export const updatePoolData = createAction<{ pools: PoolData[]; chainId: number }>('info/pools/updatePoolData')
export const addPoolKeys = createAction<{ poolAddresses: string[]; chainId: number }>('info/pools/addPoolKeys')
export const updatePoolChartData = createAction<{ poolAddress: string; chartData: ChartEntry[]; chainId: number }>(
  'info/pools/updatePoolChartData',
)
export const updatePoolTransactions = createAction<{
  poolAddress: string
  transactions: Transaction[]
  chainId: number
}>('info/pools/updatePoolTransactions')

export const updateTokenData = createAction<{ tokens: TokenData[]; chainId: number }>('info/tokens/updateTokenData')
export const addTokenKeys = createAction<{ tokenAddresses: string[]; chainId: number }>('info/tokens/addTokenKeys')
export const addTokenPoolAddresses = createAction<{ tokenAddress: string; poolAddresses: string[]; chainId: number }>(
  'info/tokens/addTokenPoolAddresses',
)
export const updateTokenChartData = createAction<{ tokenAddress: string; chartData: ChartEntry[]; chainId: number }>(
  'info/tokens/updateTokenChartData',
)
export const updateTokenTransactions = createAction<{
  tokenAddress: string
  transactions: Transaction[]
  chainId: number
}>('info/tokens/updateTokenTransactions')
export const updateTokenPriceData = createAction<{
  tokenAddress: string
  secondsInterval: number
  priceData?: PriceChartEntry[]
  oldestFetchedTimestamp: number
  chainId: number
}>('info/tokens/updateTokenPriceData')

export const resetInfoData = createAction('info/resetInfoData')
