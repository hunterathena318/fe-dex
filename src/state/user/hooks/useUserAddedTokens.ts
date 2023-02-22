import { ChainId, Token } from '@techchainswapfinance/sdk'
import { createSelector } from '@reduxjs/toolkit'
import { CHAIN_ID } from 'config/constants/networks'
import { useSelector } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { AppState } from '../../index'
import { deserializeToken } from './helpers'

const selectUserTokens = ({ user: { tokens } }: AppState) => tokens

export const userAddedTokenSelector = createSelector(selectUserTokens, (serializedTokensMap) =>
  Object.values(serializedTokensMap?.[CHAIN_ID as unknown as ChainId] ?? {}).map(deserializeToken),
)
export default function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useSelector<AppState, AppState['user']['tokens']>(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId as ChainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}
