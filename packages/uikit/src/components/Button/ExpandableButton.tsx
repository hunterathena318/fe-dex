import React from "react";
import styled from "styled-components";
import { ChevronDownIcon, ChevronUpIcon } from "../Svg";
import Button from "./Button";
import IconButton from "./IconButton";

interface Props {
  onClick?: () => void;
  expanded?: boolean;
}

const CustomButton = styled(Button)`
  color: ${({ theme }) => theme.colors.sencondaryLottery};
`;

export const ExpandableButton: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <IconButton aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
      {expanded ? <ChevronUpIcon color="invertedContrast" /> : <ChevronDownIcon color="invertedContrast" />}
    </IconButton>
  );
};
ExpandableButton.defaultProps = {
  expanded: false,
};

export const ExpandableLabel: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <CustomButton
      style={{ fontSize: "16px" }}
      variant="text"
      aria-label="Hide or show expandable content"
      onClick={onClick}
      endIcon={expanded ? <ChevronUpIcon color="sencondaryLottery" /> : <ChevronDownIcon color="sencondaryLottery" />}
    >
      {children}
    </CustomButton>
  );
};
ExpandableLabel.defaultProps = {
  expanded: false,
};
