import React from "react";
import { Flex } from "../Box";
import {
  StyledFooter,
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledSociaSecondlLinks,
  StyledSociaThirdlLinks,
  StyledText,
  TextHighLight,
  WrapFlex,
  WrapTextContact,
  WrapTextSupport,
  InputEmail,
  WrapEmail,
} from "./styles";
import { FooterProps } from "./types";

const MenuItem: React.FC<FooterProps> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  return (
    <StyledFooter p={["40px 16px", null, "56px 40px 32px 40px"]} {...props} justifyContent="center">
      <WrapFlex width={["100%", null, "1200px;"]}>
        <StyledList>
          <StyledListItem>Contact Us</StyledListItem>
          <img src="/images/gem-uni-footer.png" alt="footer" width="120px" />
          <Flex flexDirection="column" mt={["42px", null, "36px"]} alignItems={["center", null, "baseline"]}>
            <WrapTextContact>
              <TextHighLight>For Investment:</TextHighLight>
              <StyledText href="mailto:hello@gemuni.io">hello@gemuni.io</StyledText>
            </WrapTextContact>
            <WrapTextSupport>
              <TextHighLight>For Marketing & Support:</TextHighLight>
              <StyledText href="mailto:growth@gemuni.io">growth@gemuni.io.</StyledText>
            </WrapTextSupport>
          </Flex>
          <Flex flexDirection="column" mt={["42px", null, "20px"]}>
            <TextHighLight>Copyright © 2022 GemUni.</TextHighLight>
            {/* <TextHighLight>All rights reserved.</TextHighLight> */}
          </Flex>
        </StyledList>

        <StyledList className="explore">
          <StyledListItem>Explore More</StyledListItem>
          <Flex className="wrap-text">
            <StyledText href="https://www.gemuni.io/" target="_blank">
              Home
            </StyledText>
            <StyledText href="https://www.gemuni.io/gaming/casual?page=1" target="_blank">
              Play Games
            </StyledText>
            <StyledText href="https://www.gemuni.io/marketplace/" target="_blank">
              NFT Marketplace
            </StyledText>
            {/* <StyledText>FAQs</StyledText> */}
            <StyledText href="https://gemuni.io/whitepaper" target="_blank">
              Whitepaper
            </StyledText>
            <StyledText href="https://gemuni.io/pitchdeck" target="_blank">
              Pitch Deck
            </StyledText>
            <StyledText href="https://medium.com/@GemUni_Official" target="_blank">
              News
            </StyledText>
            <StyledText href="https://gemuni.gitbook.io/gemuni/resources/faqs" target="_blank">
              FAQs
            </StyledText>
          </Flex>
        </StyledList>

        <StyledList>
          <StyledListItem>Connect With Us</StyledListItem>
          <StyledSocialLinks />
          <StyledSociaSecondlLinks />
          <StyledSociaThirdlLinks />
        </StyledList>

        <StyledList>
          <StyledListItem>Join Newsletter</StyledListItem>
          <StyledText>Subscribe to get more latest news and special offers from GemUni</StyledText>
          <WrapEmail>
            <InputEmail placeholder="Enter your email" />
            <img src="/images/send-email.png" alt="email" />
          </WrapEmail>
        </StyledList>
        {/* <Flex
          order={[2, null, 1]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? baseColors.warning : darkColors.text}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <Box display={["none", null, "block"]}>
            <LogoWithTextIcon isDark width="160px" />
          </Box>
        </Flex> */}

        {/* <StyledToolsContainer
          order={[1, null, 3]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
        >
          <Flex order={[2, null, 1]} alignItems="center">
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color={darkColors.textSubtle as keyof Colors}
              dropdownPosition="top-right"
            />
          </Flex>
          <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
            <Box mr="20px">
              <CakePrice cakePriceUsd={cakePriceUsd} color={darkColors.textSubtle as keyof Colors} />
            </Box>
            <Button
              as="a"
              href="https://pancakeswap.finance/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
              target="_blank"
              scale="sm"
              endIcon={<ArrowForwardIcon color={lightColors.backgroundAlt} />}
            >
              {buyCakeLabel}
            </Button>
          </Flex>
        </StyledToolsContainer> */}
      </WrapFlex>
    </StyledFooter>
  );
};

export default MenuItem;
