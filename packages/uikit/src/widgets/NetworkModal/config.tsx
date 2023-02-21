import { Config } from "./types";
import BinanceChain from "./icons/BinanceChain";
import PolygonChain from "./icons/PolygonChain";
import EthereumChain from "./icons/EthereumChain";
import AvalancheChain from "./icons/AvalancheChain";

export enum ChainId {
  BSC = 56,
  BSC_TESTNET = 97,
  MATIC = 137,
  MATIC_TESTNET = 80001,
  MAINNET = 1,
  RINKEBY = 4,
  AVALANCHE = 43114,
}

export const NETWORK_ICON: { [key: number]: any } = {
  [ChainId.BSC]: BinanceChain,
  [ChainId.MATIC]: PolygonChain,
  [ChainId.BSC_TESTNET]: BinanceChain,
  [ChainId.MATIC_TESTNET]: PolygonChain,
  [ChainId.MAINNET]: EthereumChain,
  [ChainId.RINKEBY]: EthereumChain,
  [ChainId.AVALANCHE]: AvalancheChain,
};

export const NETWORK_LABEL: { [key: number]: any } = {
  [ChainId.BSC]: "BNB",
  [ChainId.BSC_TESTNET]: "BNB Testnet",
  [ChainId.MATIC]: "Polygon",
  [ChainId.MATIC_TESTNET]: "Matic Testnet",
  [ChainId.MAINNET]: "Ethereum",
  [ChainId.RINKEBY]: "Rinkeby Testnet",
  [ChainId.AVALANCHE]: "Avalanche",
};

const networks: Config[] = [
  {
    chainId: ChainId.BSC,
    networkName: "Build and Build",
    symbol: NETWORK_LABEL[ChainId.BSC],
    icon: NETWORK_ICON[ChainId.BSC],
  },
  {
    chainId: ChainId.MATIC,
    networkName: "Polygon (Matic)",
    symbol: NETWORK_LABEL[ChainId.MATIC],
    icon: NETWORK_ICON[ChainId.MATIC],
  },
  {
    chainId: ChainId.MAINNET,
    networkName: "Ethereum",
    symbol: NETWORK_LABEL[ChainId.MAINNET],
    icon: NETWORK_ICON[ChainId.MAINNET],
  },
  {
    chainId: ChainId.AVALANCHE,
    networkName: "Avalanche C-Chain",
    symbol: NETWORK_LABEL[ChainId.AVALANCHE],
    icon: NETWORK_ICON[ChainId.AVALANCHE],
  },
];

export default networks;
