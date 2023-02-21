import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { ChainId } from "./config";
import { SwitchNetwork, Config } from "./types";

interface Props {
  networkConfig: Config;
  chainId: number;
  onDismiss: () => void;
  switchNetwork: SwitchNetwork;
}

const NetworkCard: React.FC<Props> = ({ networkConfig, chainId, onDismiss, switchNetwork }) => {
  const { symbol, icon: Icon } = networkConfig;
  return (
    <Button
      disabled={networkConfig.chainId === chainId}
      marginBottom="10px"
      variant="secondary"
      onClick={() => {
        switchNetwork(networkConfig.chainId);
        onDismiss();
      }}
    >
      <Icon
        alt={symbol}
        width={networkConfig.chainId === ChainId.MAINNET ? "16px" : "22px"}
        style={{ marginRight: 10, borderRadius: "50%" }}
      />
      <Text color="text" mr="16px" textAlign="start">
        {symbol}
      </Text>
    </Button>
  );
};

export default NetworkCard;
