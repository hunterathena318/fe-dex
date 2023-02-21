import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from '@pancakeswap/uikit'
import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'
import { Web3Provider } from '@ethersproject/providers'
import { CHAIN_ID } from 'config/constants/chains'
import getRpcUrl from 'utils/getRpcUrl'

const POLLING_INTERVAL = 12000

export const injected = new InjectedConnector({
  supportedChainIds: [
    CHAIN_ID.BSC,
    CHAIN_ID.BSC_TESTNET,
    CHAIN_ID.MATIC,
    CHAIN_ID.MATIC_TESTNET,
    CHAIN_ID.MAINNET,
    CHAIN_ID.RINKEBY,
    CHAIN_ID.AVALANCHE,
  ],
})

const walletconnect = new WalletConnectConnector({
  rpc: {
    [CHAIN_ID.BSC]: getRpcUrl(CHAIN_ID.BSC),
    [CHAIN_ID.BSC_TESTNET]: getRpcUrl(CHAIN_ID.BSC_TESTNET),
    [CHAIN_ID.MATIC]: getRpcUrl(CHAIN_ID.MATIC),
    [CHAIN_ID.MATIC_TESTNET]: getRpcUrl(CHAIN_ID.MATIC_TESTNET),
    [CHAIN_ID.MAINNET]: getRpcUrl(CHAIN_ID.MAINNET),
    [CHAIN_ID.RINKEBY]: getRpcUrl(CHAIN_ID.RINKEBY),
    [CHAIN_ID.AVALANCHE]: getRpcUrl(CHAIN_ID.AVALANCHE),
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [CHAIN_ID.BSC, CHAIN_ID.BSC_TESTNET, CHAIN_ID.MAINNET] })

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
  // [ConnectorNames.Blocto]: async () => {
  //   const { BloctoConnector } = await import('@blocto/blocto-connector')
  //   return new BloctoConnector({ chainId: , rpc: rpcUrl })
  // },
  [ConnectorNames.WalletLink]: async () => {
    const { WalletLinkConnector } = await import('@web3-react/walletlink-connector')
    return new WalletLinkConnector({
      url: getRpcUrl(CHAIN_ID.BSC),
      supportedChainIds: [CHAIN_ID.BSC],
      appName: 'Gemuniswap',
      appLogoUrl: '',
    })
  },
} as const

export const getLibrary = (provider): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string,
): Promise<string> => {
  if (window.BinanceChain && connector instanceof BscConnector) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = hexlify(toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
