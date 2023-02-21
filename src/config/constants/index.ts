import { ChainId, JSBI, Percent, Token, WETH } from '@gemuni/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { mainnetTokens, testnetTokens } from './tokens'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]?: Token[]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.BSC]: [
    mainnetTokens.wbnb,
    mainnetTokens.cake,
    mainnetTokens.busd,
    mainnetTokens.usdt,
    mainnetTokens.btcb,
    mainnetTokens.ust,
    mainnetTokens.eth,
    mainnetTokens.usdc,
  ],
  [ChainId.BSC_TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETH[ChainId.BSC]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

export const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.FANTOM]: [WETH[ChainId.FANTOM]],
  [ChainId.FANTOM_TESTNET]: [WETH[ChainId.FANTOM_TESTNET]],
  [ChainId.MATIC]: [WETH[ChainId.MATIC]],
  [ChainId.MATIC_TESTNET]: [WETH[ChainId.MATIC_TESTNET]],
  [ChainId.XDAI]: [WETH[ChainId.XDAI]],
  [ChainId.BSC]: [WETH[ChainId.BSC]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]],
  [ChainId.ARBITRUM]: [WETH[ChainId.ARBITRUM]],
  [ChainId.MOONBASE]: [WETH[ChainId.MOONBASE]],
  [ChainId.AVALANCHE]: [WETH[ChainId.AVALANCHE]],
  [ChainId.FUJI]: [WETH[ChainId.FUJI]],
  [ChainId.HECO]: [WETH[ChainId.HECO]],
  [ChainId.HECO_TESTNET]: [WETH[ChainId.HECO_TESTNET]],
  [ChainId.HARMONY]: [WETH[ChainId.HARMONY]],
  [ChainId.HARMONY_TESTNET]: [WETH[ChainId.HARMONY_TESTNET]],
  [ChainId.OKEX]: [WETH[ChainId.OKEX]],
  [ChainId.OKEX_TESTNET]: [WETH[ChainId.OKEX_TESTNET]],
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.BSC]: [mainnetTokens.busd, mainnetTokens.geni, mainnetTokens.btcb],
  [ChainId.BSC_TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.BSC]: [mainnetTokens.wbnb, mainnetTokens.dai, mainnetTokens.busd, mainnetTokens.usdt],
  [ChainId.BSC_TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSC]: [
    [mainnetTokens.cake, mainnetTokens.wbnb],
    [mainnetTokens.busd, mainnetTokens.usdt],
    [mainnetTokens.dai, mainnetTokens.usdt],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
]

export { default as farmsConfig } from './farms'
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'

export const FAST_INTERVAL = 10000
export const SLOW_INTERVAL = 60000

// Gelato uses this address to define a native currency in all chains
export const GELATO_NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'

export const GELATO_HANDLER_MAP = {
  [ChainId.MAINNET]: 'uniswap',
  [ChainId.RINKEBY]: 'uniswap',
  [ChainId.BSC]: 'pancakeswap',
  [ChainId.BSC_TESTNET]: 'pancakeswap',
  [ChainId.MATIC]: 'quickswap',
  [ChainId.MATIC_TESTNET]: 'quickswap',
  [ChainId.AVALANCHE]: 'pangolin',
}

export const getGelatoHandler = (chainId: number) => GELATO_HANDLER_MAP[chainId ?? ChainId.BSC]

export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

export const EXCHANGE_DOCS_URLS = 'https://docs.pancakeswap.finance/products/pancakeswap-exchange'
export const LIMIT_ORDERS_DOCS_URL = 'https://docs.pancakeswap.finance/products/pancakeswap-exchange/limit-orders'
