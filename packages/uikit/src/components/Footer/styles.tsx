import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks, { SocialSecondLinks, SocialThirdLinks } from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  background: linear-gradient(180deg, rgba(17, 14, 39, 0) 0%, #000000 19.27%);
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;
  width: -webkit-fill-available;
  text-align: center;

  .wrap-text {
    gap: 1.5rem;
    span {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      color: #ffffff;
    }
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    ${({ theme }) => theme.mediaQueries.md} {
      display: flex;
      flex-direction: column;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    text-align: inherit;
  }
`;

export const StyledListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  /* text-transform: capitalize; */

  &:first-child {
    color: #f8ecb6;
    font-weight: 600;
    margin-bottom: 45px;
    font-size: 22px;
    min-width: 200px;
    /* text-transform: uppercase; */
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  margin-top: 40px;
  svg {
    height: 40px;
  }
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: inherit;
  }
`;

export const StyledSociaSecondlLinks = styled(SocialSecondLinks)`
  margin-top: 24px;
  svg {
    height: 40px;
  }
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: inherit;
  }
`;

export const StyledSociaThirdlLinks = styled(SocialThirdLinks)`
  margin-top: 24px;
  gap: 1.5rem;
  svg {
    height: 40px;
  }
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: inherit;
  }
`;

export const StyledText = styled.a`
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  &:hover {
    color: #f8ecb6;
  }
`;

export const TextHighLight = styled.span`
  color: #938ca7 !important;
`;

export const WrapTextContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  min-width: max-content;
  /* gap: 8px; */
`;

export const WrapTextSupport = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  min-width: max-content;
  /* gap: 8px; */
  margin-top: 1rem;
`;

export const WrapFlex = styled(Flex)`
  flex-direction: column;
  align-items: baseline;
  gap: 40px;
  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
    flex-direction: row;
    gap: 85px;
  }
`;

export const InputEmail = styled.input`
  border: 1px solid rgba(129, 75, 246, 0.2);
  border-radius: 20px;
  padding: 16px;
  background: #120b20;
  min-width: 300px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #938ca7;
  }
  :focus {
    outline: none;
    border: 1px solid #ffffff;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 280px;
  }
`;

export const WrapEmail = styled.div`
  margin-top: 24px;
  position: relative;
  img {
    position: absolute;
    top: 10px;
    right: 38px;
    ${({ theme }) => theme.mediaQueries.md} {
      right: 10px;
    }
  }
`;
