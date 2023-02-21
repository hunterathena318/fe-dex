// Set of helper functions to facilitate wallet setup

import { ExternalProvider } from '@ethersproject/providers'
import { ChainId } from '@gemuni/sdk'
import { BASE_URL } from 'config'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { nodes } from './getRpcUrl'

const NETWORK_CONFIG = {
  [ChainId.BSC]: {
    name: 'BNB Smart Chain Mainnet',
    scanURL: BLOCK_EXPLORER[ChainId.BSC],
  },
  [ChainId.BSC_TESTNET]: {
    name: 'BNB Smart Chain Testnet',
    scanURL: BLOCK_EXPLORER[ChainId.BSC_TESTNET],
  },
  [ChainId.MAINNET]: {
    name: 'Ethereum',
    scanURL: BLOCK_EXPLORER[ChainId.MAINNET],
  },
  [ChainId.RINKEBY]: {
    name: 'Rinkeby',
    scanURL: BLOCK_EXPLORER[ChainId.RINKEBY],
  },
  [ChainId.MATIC]: {
    name: 'Polygon',
    scanURL: BLOCK_EXPLORER[ChainId.MATIC],
  },
  [ChainId.MATIC_TESTNET]: {
    name: 'Mumbai',
    scanURL: BLOCK_EXPLORER[ChainId.MATIC_TESTNET],
  },
  [ChainId.AVALANCHE]: {
    name: 'Avalanche C Chain',
    scanURL: BLOCK_EXPLORER[ChainId.AVALANCHE],
  },
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10) as keyof typeof NETWORK_CONFIG
  if (!NETWORK_CONFIG[chainId]) {
    console.error('Invalid chain id')
    return false
  }
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      return true
    } catch (switchError) {
      if ((switchError as any)?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: NETWORK_CONFIG[chainId].name,
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'bnb',
                  decimals: 18,
                },
                rpcUrls: nodes,
                blockExplorerUrls: [`${NETWORK_CONFIG[chainId].scanURL}/`],
              },
            ],
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
          return false
        }
      }
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
      },
    },
  })

  return tokenAdded
}
