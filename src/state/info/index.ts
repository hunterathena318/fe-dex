/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit'
import { CHAIN_ID } from 'config/constants/chains'
import { InfoState } from './types'
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
  resetInfoData,
} from './actions'

const initialState: InfoState = {
  protocol: {},
  pools: {
    [CHAIN_ID.BSC]: { byAddress: {} },
    [CHAIN_ID.BSC_TESTNET]: { byAddress: {} },
    [CHAIN_ID.MAINNET]: { byAddress: {} },
    [CHAIN_ID.RINKEBY]: { byAddress: {} },
    [CHAIN_ID.MATIC_TESTNET]: { byAddress: {} },
    [CHAIN_ID.MATIC]: { byAddress: {} },
    [CHAIN_ID.AVALANCHE]: { byAddress: {} },
  },
  tokens: {
    [CHAIN_ID.BSC]: { byAddress: {} },
    [CHAIN_ID.BSC_TESTNET]: { byAddress: {} },
    [CHAIN_ID.MAINNET]: { byAddress: {} },
    [CHAIN_ID.RINKEBY]: { byAddress: {} },
    [CHAIN_ID.MATIC_TESTNET]: { byAddress: {} },
    [CHAIN_ID.MATIC]: { byAddress: {} },
    [CHAIN_ID.AVALANCHE]: { byAddress: {} },
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(resetInfoData, (state) => {
      console.log('reset state')
      state.protocol = {}
      state.pools = {
        [CHAIN_ID.BSC]: { byAddress: {} },
        [CHAIN_ID.BSC_TESTNET]: { byAddress: {} },
        [CHAIN_ID.MAINNET]: { byAddress: {} },
        [CHAIN_ID.RINKEBY]: { byAddress: {} },
        [CHAIN_ID.MATIC_TESTNET]: { byAddress: {} },
        [CHAIN_ID.MATIC]: { byAddress: {} },
        [CHAIN_ID.AVALANCHE]: { byAddress: {} },
      }
      state.tokens = {
        [CHAIN_ID.BSC]: { byAddress: {} },
        [CHAIN_ID.BSC_TESTNET]: { byAddress: {} },
        [CHAIN_ID.MAINNET]: { byAddress: {} },
        [CHAIN_ID.RINKEBY]: { byAddress: {} },
        [CHAIN_ID.MATIC_TESTNET]: { byAddress: {} },
        [CHAIN_ID.MATIC]: { byAddress: {} },
        [CHAIN_ID.AVALANCHE]: { byAddress: {} },
      }
    })
    // Protocol actions
    .addCase(updateProtocolData, (state, { payload: { protocolData } }) => {
      state.protocol.overview = protocolData
    })
    .addCase(updateProtocolChartData, (state, { payload: { chartData } }) => {
      state.protocol.chartData = chartData
    })
    .addCase(updateProtocolTransactions, (state, { payload: { transactions } }) => {
      state.protocol.transactions = transactions
    })
    // Pools actions
    .addCase(updatePoolData, (state, { payload: { pools, chainId } }) => {
      pools.forEach((poolData) => {
        state.pools[chainId].byAddress[poolData.address] = {
          ...state.pools[chainId]?.byAddress[poolData.address],
          data: poolData,
        }
      })
    })
    .addCase(addPoolKeys, (state, { payload: { poolAddresses, chainId } }) => {
      poolAddresses.forEach((address) => {
        let check = false
        // eslint-disable-next-line
        for (const myChainId in state.pools) {
          if (state.pools[myChainId]?.byAddress[address]) {
            check = true
            break
          }
        }
        if (!check && chainId) {
          if (state.pools[chainId]) {
            state.pools[chainId].byAddress[address] = {
              chainId,
              data: undefined,
              chartData: undefined,
              transactions: undefined,
            }
          }
        }
      })
    })
    .addCase(updatePoolChartData, (state, { payload: { poolAddress, chartData, chainId } }) => {
      state.pools[chainId].byAddress[poolAddress] = { ...state.pools[chainId]?.byAddress[poolAddress], chartData }
    })
    .addCase(updatePoolTransactions, (state, { payload: { poolAddress, transactions, chainId } }) => {
      state.pools[chainId].byAddress[poolAddress] = { ...state.pools[chainId]?.byAddress[poolAddress], transactions }
    })
    // Tokens actions
    .addCase(updateTokenData, (state, { payload: { tokens, chainId } }) => {
      tokens.forEach((tokenData) => {
        state.tokens[chainId].byAddress[tokenData.address] = {
          ...state.tokens[chainId]?.byAddress[tokenData.address],
          data: tokenData,
        }
      })
    })
    .addCase(addTokenKeys, (state, { payload: { tokenAddresses, chainId } }) => {
      tokenAddresses.forEach((address) => {
        let check = false
        // eslint-disable-next-line
        for (const myChainId in state.tokens) {
          if (state.tokens[myChainId]?.byAddress[address]) {
            check = true
            break
          }
        }
        if (!check && chainId && state.tokens[chainId]) {
          state.tokens[chainId].byAddress[address] = {
            chainId,
            poolAddresses: undefined,
            data: undefined,
            chartData: undefined,
            priceData: {},
            transactions: undefined,
          }
        }
      })
    })
    .addCase(addTokenPoolAddresses, (state, { payload: { tokenAddress, poolAddresses, chainId } }) => {
      if (chainId && state.tokens[chainId]) {
        state.tokens[chainId].byAddress[tokenAddress] = {
          ...state.tokens[chainId]?.byAddress[tokenAddress],
          poolAddresses,
        }
      }
    })
    .addCase(updateTokenChartData, (state, { payload: { tokenAddress, chartData, chainId } }) => {
      state.tokens[chainId].byAddress[tokenAddress] = { ...state.tokens[chainId]?.byAddress[tokenAddress], chartData }
    })
    .addCase(updateTokenTransactions, (state, { payload: { tokenAddress, transactions, chainId } }) => {
      state.tokens[chainId].byAddress[tokenAddress] = {
        ...state.tokens[chainId]?.byAddress[tokenAddress],
        transactions,
      }
    })
    .addCase(
      updateTokenPriceData,
      (state, { payload: { tokenAddress, secondsInterval, priceData, oldestFetchedTimestamp, chainId } }) => {
        state.tokens[chainId].byAddress[tokenAddress] = {
          ...state.tokens[chainId]?.byAddress[tokenAddress],
          priceData: {
            ...state.tokens[chainId]?.byAddress[tokenAddress]?.priceData,
            [secondsInterval]: priceData,
            oldestFetchedTimestamp,
          },
        }
      },
    ),
)
