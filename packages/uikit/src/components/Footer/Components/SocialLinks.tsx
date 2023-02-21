import React from "react";
import styled from "styled-components";
import { darkColors } from "../../../theme";
import { FlexProps } from "../../Box";
import Flex from "../../Box/Flex";
import Dropdown from "../../Dropdown/Dropdown";
import Link from "../../Link/Link";
import { socials, secondSocials, thirdSocials } from "../config";

const StyledLink = styled(Link)`
  position: relative;
  &::before {
    position: absolute;
    inset: 0;
    content: "";
    border: 1px inset transparent;
    border-radius: 50%;
    transition: border 200ms;
  }
  &:hover::before {
    border: 1px solid #ffff;
  }
`;

const SocialLinks: React.FC<FlexProps> = ({ ...props }) => (
  <Flex {...props}>
    {socials.map((social, index) => {
      const iconProps = {
        width: "40px",
        color: darkColors.textSubtle,
        style: { cursor: "pointer" },
      };
      const Icon = social.icon;
      const mr = index < socials.length - 1 ? "24px" : 0;
      // if (social.items) {
      //   return (
      //     <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
      //       {social.items.map((item) => (
      //         <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
      //           {item.label}
      //         </Link>
      //       ))}
      //     </Dropdown>
      //   );
      // }
      return (
        <StyledLink external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
          <Icon {...iconProps} />
        </StyledLink>
      );
    })}
  </Flex>
);

// eslint-disable-next-line import/export
export default React.memo(SocialLinks, () => true);

export const SocialSecondLinks: React.FC<FlexProps> = ({ ...props }) => (
  <Flex {...props}>
    {secondSocials.map((social, index) => {
      const iconProps = {
        width: "40px",
        color: darkColors.textSubtle,
        style: { cursor: "pointer" },
      };
      const Icon = social.icon;
      const mr = index < socials.length - 1 ? "24px" : 0;
      return (
        <StyledLink external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
          <Icon {...iconProps} />
        </StyledLink>
      );
    })}
  </Flex>
);

export const SocialThirdLinks: React.FC<FlexProps> = ({ ...props }) => (
  <Flex {...props}>
    {thirdSocials.map((social, index) => {
      const iconProps = {
        width: "40px",
        color: darkColors.textSubtle,
        style: { cursor: "pointer" },
      };
      const Icon = social.icon;
      const mr = index < socials.length - 1 ? "24px" : 0;
      return (
        <Flex>
          <StyledLink external key={social.label} href={social.href} aria-label={social.label}>
            <Icon {...iconProps} />
          </StyledLink>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: "Inter",
              marginLeft: "0.7rem",
            }}
          >
            {social.text}
          </span>
        </Flex>
      );
    })}
  </Flex>
);
