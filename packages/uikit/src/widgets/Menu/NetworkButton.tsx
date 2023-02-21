import React from "react";
import Button from "../../components/Button/Button";
import { useNetworkModal, SwitchNetwork } from "../NetworkModal";
import { ChainId, NETWORK_LABEL } from "../NetworkModal/config";
import BinanceChain from "../NetworkModal/icons/BinanceChain";
import PolygonChain from "../NetworkModal/icons/PolygonChain";
import EthereumChain from "../NetworkModal/icons/EthereumChain";
import AvalancheChain from "../NetworkModal/icons/AvalancheChain";

interface Props {
  chainId: number;
  switchNetwork: SwitchNetwork;
}

export const NETWORK_ICON: { [key: number]: any } = {
  [ChainId.BSC]: <BinanceChain width="18px" mr="5px" />,
  [ChainId.BSC_TESTNET]: <BinanceChain width="18px" mr="5px" />,
  [ChainId.MATIC]: <PolygonChain width="18px" mr="5px" />,
  [ChainId.MATIC_TESTNET]: <PolygonChain width="18px" mr="5px" />,
  [ChainId.MAINNET]: <EthereumChain width="16px" mr="5px" />,
  [ChainId.RINKEBY]: <EthereumChain width="16px" mr="5px" />,
  [ChainId.AVALANCHE]: <AvalancheChain width="18px" mr="5px" />,
};

const NetworkButton: React.FC<Props> = ({ chainId, switchNetwork }) => {
  const { onPresentNetworkModal } = useNetworkModal(switchNetwork, chainId);

  return (
    <Button
      size="sm"
      variant="tertiary"
      color="text"
      onClick={() => {
        onPresentNetworkModal();
      }}
    >
      {NETWORK_ICON[chainId]} {NETWORK_LABEL[chainId]}
    </Button>
  );
};

export default NetworkButton;
