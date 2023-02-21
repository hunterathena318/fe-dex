import { ChainId } from '@gemuni/sdk'

export const GRAPH_API_PROFILE = process.env.NEXT_PUBLIC_GRAPH_API_PROFILE
export const GRAPH_API_PREDICTION = process.env.NEXT_PUBLIC_GRAPH_API_PREDICTION
export const GRAPH_API_LOTTERY = process.env.NEXT_PUBLIC_GRAPH_API_LOTTERY

export const SNAPSHOT_BASE_URL = process.env.NEXT_PUBLIC_SNAPSHOT_BASE_URL
export const API_PROFILE = process.env.NEXT_PUBLIC_API_PROFILE
export const API_NFT = process.env.NEXT_PUBLIC_API_NFT
export const SNAPSHOT_API = `${SNAPSHOT_BASE_URL}/graphql`
export const SNAPSHOT_HUB_API = `${SNAPSHOT_BASE_URL}/api/message`

/**
 * V1 will be deprecated but is still used to claim old rounds
 */
export const GRAPH_API_PREDICTION_V1 = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction'

export const INFO_CLIENT = ' https://proxy-worker-dev.pancake-swap.workers.dev/bsc-exchange'

export const INFO_CLIENT_MAP = {
  [ChainId.BSC]: ' https://proxy-worker-dev.pancake-swap.workers.dev/bsc-exchange',
  [ChainId.BSC_TESTNET]: ' https://proxy-worker-dev.pancake-swap.workers.dev/bsc-exchange',
  [ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/uniswap-mainnet2',
  [ChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/uniswap-mainnet2',
  [ChainId.MATIC]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/quickswap-matic2',
  [ChainId.MATIC_TESTNET]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/quickswap-matic2',
  [ChainId.AVALANCHE]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/pangolin-avalanche3',
}
export const getInfoClientUrl = (chainId: number) =>
  INFO_CLIENT_MAP[chainId ?? parseInt(window.localStorage.getItem('chainIdStatus'))]

export const GRAPH_API_LOTTERY_MAP = {
  [ChainId.BSC]: 'https://api.thegraph.com/subgraphs/name/gemuni-dex/lottery-bsc',
  [ChainId.BSC_TESTNET]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/lottery7-v2',
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/lottery-rinkeby',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/lottery-mumbai2',
  [ChainId.AVALANCHE]: '',
}

export const getGraphAPILottery = (chainId: number) =>
  GRAPH_API_LOTTERY_MAP[chainId ?? parseInt(window.localStorage.getItem('chainIdStatus'))]

export const BLOCKS_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'

export const BLOCKS_CLIENT_MAP = {
  [ChainId.BSC]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks',
  [ChainId.BSC_TESTNET]: 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks',
  [ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/block-ethereum',
  [ChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/block-ethereum',
  [ChainId.MATIC]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/block-polygon',
  [ChainId.MATIC_TESTNET]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/block-polygon',
  [ChainId.AVALANCHE]: 'https://api.thegraph.com/subgraphs/name/shivannguyen/block-avax',
}

export const getBlockClient = (chainId: number) =>
  BLOCKS_CLIENT_MAP[chainId ?? parseInt(window.localStorage.getItem('chainIdStatus'))]

export const TIMESTAMP_INFO_MAP = {
  [ChainId.BSC]: new Date(),
  [ChainId.BSC_TESTNET]: new Date(),
  [ChainId.MAINNET]: new Date(),
  [ChainId.RINKEBY]: new Date(),
  [ChainId.MATIC]: new Date('2021-07-20'),
  [ChainId.MATIC_TESTNET]: new Date('2021-07-20'),
  [ChainId.AVALANCHE]: new Date('2021-08-01'),
}

export const getTimestampInfo = (chainId: number) =>
  TIMESTAMP_INFO_MAP[chainId ?? parseInt(window.localStorage.getItem('chainIdStatus'))]

export const TRUSTWALLET_ASSET_MAP = {
  [ChainId.BSC]: 'smartchain',
  [ChainId.BSC_TESTNET]: 'smartchain',
  [ChainId.MAINNET]: 'ethereum',
  [ChainId.RINKEBY]: 'ethereum',
  [ChainId.MATIC]: 'polygon',
  [ChainId.MATIC_TESTNET]: 'polygon',
  [ChainId.AVALANCHE]: 'avalanchec',
}

export const getTrustWalletAsset = (chainId: number) =>
  TRUSTWALLET_ASSET_MAP[chainId ?? parseInt(window.localStorage.getItem('chainIdStatus'))]
export const GRAPH_API_NFTMARKET = process.env.NEXT_PUBLIC_GRAPH_API_NFT_MARKET
export const GRAPH_HEALTH = 'https://api.thegraph.com/index-node/graphql'
