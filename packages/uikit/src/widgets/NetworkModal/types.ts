export type SwitchNetwork = (chainId: number) => void;

export interface Config {
  chainId: number;
  networkName: string;
  symbol: string;
  icon: any;
}
