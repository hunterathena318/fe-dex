import { ChainId, Token } from '@techchainswapfinance/sdk'
import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { DEFAULT_LIST_OF_LISTS, OFFICIAL_LISTS } from 'config/constants/lists'
import { AppState } from '../index'
import DEFAULT_TOKEN_LIST from '../../config/constants/tokenLists/pancake-default.tokenlist.json'
import POLYGON_TOKEN_LIST from '../../config/constants/tokenLists/polygon.json'
import MUMBAI_TOKEN_LIST from '../../config/constants/tokenLists/mumbai.json'
import MAINNET_TOKEN_LIST from '../../config/constants/tokenLists/mainnet.json'
import RINKEBY_TOKEN_LIST from '../../config/constants/tokenLists/rinkeby.json'
import AVALANCHE_TOKEN_LIST from '../../config/constants/tokenLists/avalanche.json'

import { UNSUPPORTED_LIST_URLS } from '../../config/constants/lists'
import UNSUPPORTED_TOKEN_LIST from '../../config/constants/tokenLists/pancake-unsupported.tokenlist.json'

type TagDetails = Tags[keyof Tags]
export interface TagInfo extends TagDetails {
  id: string
}

// use ordering of default list of lists to assign priority
function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1
  if (first > second) return -1
  return 0
}

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo

  public readonly tags: TagInfo[]

  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo?.symbol, tokenInfo.name)
    this.tokenInfo = tokenInfo
    this.tags = tags
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }
}

export type TokenAddressMap = Readonly<{
  [chainId in ChainId]: Readonly<{ [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList } }>
}>

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.MAINNET]: {},
  [ChainId.ROPSTEN]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.GÖRLI]: {},
  [ChainId.KOVAN]: {},
  [ChainId.FANTOM]: {},
  [ChainId.FANTOM_TESTNET]: {},
  [ChainId.MATIC]: {},
  [ChainId.MATIC_TESTNET]: {},
  [ChainId.XDAI]: {},
  [ChainId.BSC]: {},
  [ChainId.BSC_TESTNET]: {},
  [ChainId.ARBITRUM]: {},
  [ChainId.MOONBASE]: {},
  [ChainId.AVALANCHE]: {},
  [ChainId.FUJI]: {},
  [ChainId.HECO]: {},
  [ChainId.HECO_TESTNET]: {},
  [ChainId.HARMONY]: {},
  [ChainId.HARMONY_TESTNET]: {},
  [ChainId.OKEX]: {},
  [ChainId.OKEX_TESTNET]: {},
}

// -------------------------------------
//   Selectors
// -------------------------------------
const selectorActiveUrls = (state: AppState) => state.lists.activeListUrls
const selectorByUrls = (state: AppState) => state.lists.byUrl
const activeListUrlsSelector = createSelector(selectorActiveUrls, (urls) =>
  urls?.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url)),
)

const combineTokenMapsWithDefault = (lists: AppState['lists']['byUrl'], urls: string[]) => {
  const defaultTokenMap = listToTokenMap({
    ...DEFAULT_TOKEN_LIST,
    tokens: [
      ...DEFAULT_TOKEN_LIST.tokens,
      ...POLYGON_TOKEN_LIST.tokens,
      ...MUMBAI_TOKEN_LIST.tokens,
      ...MAINNET_TOKEN_LIST.tokens,
      ...RINKEBY_TOKEN_LIST.tokens,
      ...AVALANCHE_TOKEN_LIST.tokens,
    ],
  })

  if (!urls) return defaultTokenMap
  return combineMaps(combineTokenMaps(lists, urls), defaultTokenMap)
}

const combineTokenMaps = (lists: AppState['lists']['byUrl'], urls: string[]) => {
  if (!urls) return EMPTY_LIST
  return (
    urls
      .slice()
      // sort by priority so top priority goes last
      .sort(sortByListPriority)
      .reduce((allTokens, currentUrl) => {
        const current = lists[currentUrl]?.current
        if (!current) return allTokens
        try {
          const newTokens = Object.assign(listToTokenMap(current))
          return combineMaps(allTokens, newTokens)
        } catch (error) {
          console.error('Could not show token list due to error', error)
          return allTokens
        }
      }, EMPTY_LIST)
  )
}

export const combinedTokenMapFromActiveUrlsSelector = createSelector(
  [selectorByUrls, selectorActiveUrls],
  (lists, urls) => {
    return combineTokenMapsWithDefault(lists, urls)
  },
)

const inactiveUrlSelector = createSelector([selectorByUrls, selectorActiveUrls], (lists, urls) => {
  return Object.keys(lists).filter((url) => !urls?.includes(url) && !UNSUPPORTED_LIST_URLS.includes(url))
})

export const combinedTokenMapFromInActiveUrlsSelector = createSelector(
  [selectorByUrls, inactiveUrlSelector],
  (lists, inactiveUrl) => {
    return combineTokenMaps(lists, inactiveUrl)
  },
)

export const combinedTokenMapFromOfficialsUrlsSelector = createSelector([selectorByUrls], (lists) => {
  return combineTokenMapsWithDefault(lists, OFFICIAL_LISTS)
})

export const combinedTokenMapFromUnsupportedUrlsSelector = createSelector([selectorByUrls], (lists) => {
  // get hard coded unsupported tokens
  const localUnsupportedListMap = listToTokenMap(UNSUPPORTED_TOKEN_LIST)
  // get any loaded unsupported tokens
  const loadedUnsupportedListMap = combineTokenMaps(lists, UNSUPPORTED_LIST_URLS)

  return combineMaps(localUnsupportedListMap, loadedUnsupportedListMap)
})

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<TokenList, TokenAddressMap>() : null

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list)
  if (result) return result

  const map = list.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const tags: TagInfo[] =
        tokenInfo.tags
          ?.map((tagId) => {
            if (!list.tags?.[tagId]) return undefined
            return { ...list.tags[tagId], id: tagId }
          })
          ?.filter((x): x is TagInfo => Boolean(x)) ?? []

      const token = new WrappedTokenInfo(tokenInfo, tags)
      if (tokenMap[token.chainId][token.address] !== undefined) {
        console.warn(`Duplicate token skipped: ${token.address}`)
        return tokenMap
      }

      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: {
            token,
            list,
          },
        },
      }
    },
    { ...EMPTY_LIST },
  )
  listCache?.set(list, map)
  return map
}

// -------------------------------------
//   Hooks
// -------------------------------------
export function useAllLists(): {
  readonly [url: string]: {
    readonly current: TokenList | null
    readonly pendingUpdate: TokenList | null
    readonly loadingRequestId: string | null
    readonly error: string | null
  }
} {
  return useSelector(selectorByUrls)
}

function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  return {
    [ChainId.MAINNET]: { ...map1[ChainId.MAINNET], ...map2[ChainId.MAINNET] },
    [ChainId.ROPSTEN]: { ...map1[ChainId.ROPSTEN], ...map2[ChainId.ROPSTEN] },
    [ChainId.RINKEBY]: { ...map1[ChainId.RINKEBY], ...map2[ChainId.RINKEBY] },
    [ChainId.GÖRLI]: { ...map1[ChainId.GÖRLI], ...map2[ChainId.GÖRLI] },
    [ChainId.KOVAN]: { ...map1[ChainId.KOVAN], ...map2[ChainId.KOVAN] },
    [ChainId.FANTOM]: { ...map1[ChainId.FANTOM], ...map2[ChainId.FANTOM] },
    [ChainId.FANTOM_TESTNET]: { ...map1[ChainId.FANTOM_TESTNET], ...map2[ChainId.FANTOM_TESTNET] },
    [ChainId.MATIC]: { ...map1[ChainId.MATIC], ...map2[ChainId.MATIC] },
    [ChainId.MATIC_TESTNET]: { ...map1[ChainId.MATIC_TESTNET], ...map2[ChainId.MATIC_TESTNET] },
    [ChainId.XDAI]: { ...map1[ChainId.XDAI], ...map2[ChainId.XDAI] },
    [ChainId.BSC]: { ...map1[ChainId.BSC], ...map2[ChainId.BSC] },
    [ChainId.BSC_TESTNET]: { ...map1[ChainId.BSC_TESTNET], ...map2[ChainId.BSC_TESTNET] },
    [ChainId.ARBITRUM]: { ...map1[ChainId.ARBITRUM], ...map2[ChainId.ARBITRUM] },
    [ChainId.MOONBASE]: { ...map1[ChainId.FANTOM], ...map2[ChainId.FANTOM] },
    [ChainId.AVALANCHE]: { ...map1[ChainId.AVALANCHE], ...map2[ChainId.AVALANCHE] },
    [ChainId.FUJI]: { ...map1[ChainId.FUJI], ...map2[ChainId.FUJI] },
    [ChainId.HECO]: { ...map1[ChainId.HECO], ...map2[ChainId.HECO] },
    [ChainId.HECO_TESTNET]: { ...map1[ChainId.HECO_TESTNET], ...map2[ChainId.HECO_TESTNET] },
    [ChainId.HARMONY]: { ...map1[ChainId.HARMONY], ...map2[ChainId.HARMONY] },
    [ChainId.HARMONY_TESTNET]: { ...map1[ChainId.FANTOM], ...map2[ChainId.FANTOM] },
    [ChainId.OKEX]: { ...map1[ChainId.OKEX], ...map2[ChainId.OKEX] },
    [ChainId.OKEX_TESTNET]: { ...map1[ChainId.OKEX_TESTNET], ...map2[ChainId.OKEX_TESTNET] },
  }
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  return useSelector(activeListUrlsSelector)
}

export function useInactiveListUrls() {
  return useSelector(inactiveUrlSelector)
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  const activeTokens = useSelector(combinedTokenMapFromActiveUrlsSelector)
  return activeTokens
}

// all tokens from inactive lists
export function useCombinedInactiveList(): TokenAddressMap {
  return useSelector(combinedTokenMapFromInActiveUrlsSelector)
}

// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): TokenAddressMap {
  return useSelector(combinedTokenMapFromUnsupportedUrlsSelector)
}

export function useIsListActive(url: string): boolean {
  const activeListUrls = useActiveListUrls()
  return useMemo(() => Boolean(activeListUrls?.includes(url)), [activeListUrls, url])
}
