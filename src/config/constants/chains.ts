// Network chain ids

export const CHAIN_ID = {
  BSC: 56,
  BSC_TESTNET: 97,
  MATIC: 137,
  MATIC_TESTNET: 80001,
  MAINNET: 1,
  RINKEBY: 4,
  AVALANCHE: 43114,
}

// Network labels

export const NETWORK_LABEL = {
  [CHAIN_ID.BSC]: 'BSC',
  [CHAIN_ID.BSC_TESTNET]: 'BSC Testnet',
  [CHAIN_ID.MATIC]: 'Polygon',
  [CHAIN_ID.MATIC_TESTNET]: 'Polygon Testnet',
  [CHAIN_ID.MAINNET]: 'Ethereum',
  [CHAIN_ID.RINKEBY]: 'Rinkeby Testnet',
  [CHAIN_ID.AVALANCHE]: 'Avalanche C-Chain',
}
// Network icons

export const NETWORK_ICON = {
  [CHAIN_ID.BSC]: '',
  [CHAIN_ID.BSC_TESTNET]: '',
  [CHAIN_ID.MATIC]: '',
  [CHAIN_ID.MATIC_TESTNET]: '',
  [CHAIN_ID.MAINNET]: '',
  [CHAIN_ID.RINKEBY]: '',
  [CHAIN_ID.AVALANCHE]: '',
}

export const NETWORK_INFO_LINK = {
  [CHAIN_ID.BSC]: '',
  [CHAIN_ID.BSC_TESTNET]: '',
  [CHAIN_ID.MATIC]: '',
  [CHAIN_ID.MATIC_TESTNET]: '',
  [CHAIN_ID.MAINNET]: '',
  [CHAIN_ID.RINKEBY]: '',
  [CHAIN_ID.AVALANCHE]: '',
}

// Network RPC nodes
export const NETWORK_RPC = {
  [CHAIN_ID.BSC]: ['https://bsc-dataseed.binance.org'],
  [CHAIN_ID.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [CHAIN_ID.MATIC]: ['https://polygon-rpc.com/'],
  [CHAIN_ID.MATIC_TESTNET]: ['https://matic-mumbai.chainstacklabs.com'],
  [CHAIN_ID.MAINNET]: ['https://eth-node.gemuni.io/'],
  [CHAIN_ID.RINKEBY]: ['https://rinkeby.infura.io/v3/1f4d47df0df44cf3acc7b8f121e15d7d'],
  [CHAIN_ID.AVALANCHE]: ['https://api.avax.network/ext/bc/C/rpc'],
}

// Network block explorers

export const BLOCK_EXPLORER = {
  [CHAIN_ID.BSC]: 'https://bscscan.com',
  [CHAIN_ID.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [CHAIN_ID.MATIC]: 'https://polygonscan.com',
  [CHAIN_ID.MATIC_TESTNET]: 'https://mumbai.polygonscan.com/',
  [CHAIN_ID.MAINNET]: 'https://etherscan.io/',
  [CHAIN_ID.RINKEBY]: 'https://rinkeby.etherscan.io/',
  [CHAIN_ID.AVALANCHE]: 'https://cchain.explorer.avax.network/',
}

export const CHAIN_PARAMS = {
  [CHAIN_ID.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.BSC],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.BSC]],
  },
  [CHAIN_ID.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.BSC_TESTNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.BSC_TESTNET]],
  },
  [CHAIN_ID.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MATIC],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MATIC]],
  },
  [CHAIN_ID.MATIC_TESTNET]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MATIC_TESTNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MATIC_TESTNET]],
  },
  [CHAIN_ID.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'eth',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MAINNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MAINNET]],
  },
  [CHAIN_ID.RINKEBY]: {
    chainId: '0x4',
    chainName: 'Rinkeby Test Network',
    nativeCurrency: {
      name: 'eth',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.RINKEBY],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.RINKEBY]],
  },
  [CHAIN_ID.AVALANCHE]: {
    chainId: '0xA86A',
    chainName: 'Avalanche C-Chain',
    nativeCurrency: {
      name: 'Avax',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.AVALANCHE],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.AVALANCHE]],
  },
}
