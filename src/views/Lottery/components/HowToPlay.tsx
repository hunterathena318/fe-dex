import styled from 'styled-components'
import { Box, Flex, Text, Heading, useMatchBreakpoints, Link, Image } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { BallWithNumber, MatchExampleA, MatchExampleB, PoolAllocationChart } from '../svgs'

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 40px 0;
  width: 100%;
`

const BulletList = styled.ul`
  list-style-type: none;
  margin-left: 8px;
  padding: 0;
  li {
    margin: 10px 0px 0px 0px;
    padding: 0;
  }
  li::before {
    content: '•';
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
  li::marker {
    font-size: 12px;
  }
`

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  padding: 0 90px;
  flex-direction: column;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
  @media screen and (max-width: 800px) {
    padding: 0;
  }
`

const StyledStepCard = styled(Box)`
  width: 285px;
  max-heigt: 329px;
  min-height: 329px;
  display: flex;
  align-self: baseline;
  position: relative;
  padding: 1px 1px 3px 1px;
  border-radius: ${({ theme }) => theme.radii.card};
  background: rgba(43, 27, 78, 0.4);
  border: 1px solid rgba(129, 75, 246, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(129, 75, 246, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  @media screen and (max-width: 800px) {
    margin: auto;
  }
`

const StepCardInner = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
`

const TextNumberStep = styled.div`
  width: 120px;
  min-height: 120px;
  border-radius: 50%;
  background: rgba(129, 75, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 21px;
  div {
    color: #c770e6;
    text-shadow: 0px 4px 20px #8668df;
    margin: 0;
  }
`
const BoxMarginTopStep = styled.div`
  padding-top: 60px;
  @media screen and (max-width: 800px) {
    padding-top: 0px;
  }
`
const HeadingStep = styled.h1`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 25px;
  line-height: 120%;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 4px 20px #8668df;
`
const TitleStep = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #777e90;
`
const HeadingLinear = styled.h2`
  max-width: 200px;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 25px;
  line-height: 120%;
  text-align: left;
  background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 4px 20px #8668df;
`
const TextRadius = styled.p`
  margin-top: 10px;
  margin-right: 34px;
  width: 42px;
  height: 42px;
  background: rgba(129, 75, 246, 0.2);
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px) {
    margin-right: 14px;
  }
`

type Step = { title: string; subtitle: string; label: string }

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner>
        <TextNumberStep>
          <Text mb="16px" fontSize="24px" bold textAlign="center" textTransform="uppercase">
            {step.label}
          </Text>
        </TextNumberStep>
        <HeadingStep>{step.title}</HeadingStep>
        <TitleStep>{step.subtitle}</TitleStep>
      </StepCardInner>
    </StyledStepCard>
  )
}

const BallsContainer = styled(Flex)`
  padding-left: 28px;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xs} {
    gap: 7px;
    padding-left: 65px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 85px;
  }
`

const InlineLink = styled(Link)`
  display: inline;
  background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 4px 20px #8668df;
`

const ExampleBalls = () => {
  const { isDesktop } = useMatchBreakpoints()
  const ballSize = isDesktop ? '24px' : '32px'
  const fontSize = isDesktop ? '14px' : '16px'
  return (
    <BallsContainer>
      <BallWithNumber size={ballSize} fontSize={fontSize} color="yellow" number="9" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="green" number="1" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="aqua" number="3" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="teal" number="6" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="lilac" number="6" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="pink" number="2" />
    </BallsContainer>
  )
}

const MatchExampleContainer = styled(Flex)`
  height: 100%;
  flex-direction: column;
`

const MatchExampleCard = () => {
  const { isDark } = useTheme()
  const { isXs, isDesktop } = useMatchBreakpoints()
  const { t } = useTranslation()
  const exampleWidth = isXs ? '180px' : '228px'
  return (
    <StyledStepCard width={['354px', '330px', '330px']} style={{ width: isDesktop ? '354px' : '100%' }}>
      <StepCardInner>
        <MatchExampleContainer>
          <ExampleBalls />
          <Flex style={{ marginBottom: 29 }} alignItems="flex-end">
            <TextRadius>{t('A')}</TextRadius>
            <MatchExampleA width={exampleWidth} height="56px" isDark={isDark} />
          </Flex>
          <Flex alignItems="flex-end">
            <TextRadius>{t('B')}</TextRadius>
            <MatchExampleB width={exampleWidth} height="56px" isDark={isDark} />
          </Flex>
        </MatchExampleContainer>
      </StepCardInner>
    </StyledStepCard>
  )
}

const AllocationGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-auto-rows: max-content;
  row-gap: 4px;
`

const AllocationColorCircle = styled.div<{ color: string }>`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
`

const AllocationMatch: React.FC<{ color: string; text: string }> = ({ color, text }) => {
  return (
    <Flex alignItems="center">
      <AllocationColorCircle color={color} />
      <Text color="textSubtle">{text}</Text>
    </Flex>
  )
}

const PoolAllocations = () => {
  const { t } = useTranslation()
  return (
    <StyledStepCard width={['354px', '330px', '380px']} style={{ width: '354px' }}>
      <StepCardInner height="auto">
        <Flex mb="32px" justifyContent="center">
          <PoolAllocationChart width="100px" height="100px" />
        </Flex>
        <Flex justifyContent="space-between" width="100%">
          <Text fontSize="12px" color="secondary" bold textTransform="uppercase">
            {t('Digits matched')}
          </Text>
          <Text fontSize="12px" color="secondary" bold textAlign="right" textTransform="uppercase">
            {t('Prize pool allocation')}
          </Text>
        </Flex>
        <AllocationGrid>
          <AllocationMatch color="#FFE362" text={t('Matches first %digits%', { digits: 1 })} />
          <Text textAlign="right" bold>
            2%
          </Text>
          <AllocationMatch color="#85C54E" text={t('Matches first %digits%', { digits: 2 })} />
          <Text textAlign="right" bold>
            3%
          </Text>
          <AllocationMatch color="#028E75" text={t('Matches first %digits%', { digits: 3 })} />
          <Text textAlign="right" bold>
            5%
          </Text>
          <AllocationMatch color="#36E8F5" text={t('Matches first %digits%', { digits: 4 })} />
          <Text textAlign="right" bold>
            10%
          </Text>
          <AllocationMatch color="#A881FC" text={t('Matches first %digits%', { digits: 5 })} />
          <Text textAlign="right" bold>
            20%
          </Text>
          <AllocationMatch color="#D750B2" text={t('Matches all 6')} />
          <Text textAlign="right" bold>
            40%
          </Text>
          <AllocationMatch color="#BDC2C4" text={t('Burn Pool')} />
          <Text textAlign="right" bold>
            20%
          </Text>
        </AllocationGrid>
      </StepCardInner>
    </StyledStepCard>
  )
}

const GappedFlex = styled(Flex)`
  gap: 24px;
  margin-top: 78px;
  background: rgba(43, 27, 78, 0.4);
  border: 1px solid rgba(129, 75, 246, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 1px 0px rgb(0 0 0 / 25%), inset 0px 1px 0px rgb(129 75 246 / 20%);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  @media screen and (max-width: 800px) {
    padding: 11px 0 0px 0;
  }
`

const HowToPlay: React.FC = () => {
  const { t } = useTranslation()

  const steps: Step[] = [
    {
      label: t('Step %number%', { number: 1 }),
      title: t('Buy Tickets'),
      subtitle: t('Prices are set when the round starts, equal to 5 USD in GENI per ticket.'),
    },
    {
      label: t('Step %number%', { number: 2 }),
      title: t('Wait for the Draw'),
      subtitle: t('There is one draw every day alternating between 0 AM UTC and 12 PM UTC.'),
    },
    {
      label: t('Step %number%', { number: 3 }),
      title: t('Check for Prizes'),
      subtitle: t('Once the round’s over, come back to the page and check to see if you’ve won!'),
    },
  ]
  return (
    <Box width="100%">
      <Flex mb="40px" alignItems="center" flexDirection="column">
        <Heading mb="24px" scale="xl" color="#fff" fontSize="49px">
          {t('How to Play')}
        </Heading>
        <Text textAlign="center" fontSize="16px" fontWeight="400" width="448px" height="48px" lineHeight="24px">
          {t('Cryptolly has a variety of features that make it the best place to start trading')}
        </Text>
      </Flex>
      <StepContainer>
        {steps.map((step, index) =>
          index === 1 ? (
            <BoxMarginTopStep>
              <StepCard key={step.label} step={step} />
            </BoxMarginTopStep>
          ) : (
            <StepCard key={step.label} step={step} />
          ),
        )}
      </StepContainer>
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column" padding="0px 11px 0px 11px">
          <HeadingLinear>{t('Winning Criteria')}</HeadingLinear>
          <Heading mb="24px" scale="md" fontSize="20px">
            {t('The digits on your ticket must match in the correct order to win.')}
          </Heading>
          <Text mb="16px" color="textSubtle" fontSize="16px">
            {t('Here’s an example lottery draw, with two tickets, A and B.')}
          </Text>
          <BulletList>
            <li>
              <Text display="inline" color="textSubtle" fontSize="16px">
                {t(
                  'Ticket A: The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize.',
                )}
              </Text>
            </li>
            <li>
              <Text display="inline" color="textSubtle" fontSize="16px">
                {t(
                  'Ticket B: Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize.',
                )}
              </Text>
            </li>
          </BulletList>
          <Text mt="16px" color="textSubtle" fontSize="16px">
            {t(
              'Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’.',
            )}
          </Text>
        </Flex>
        <Flex flex="1" justifyContent="center">
          <MatchExampleCard />
        </Flex>
      </GappedFlex>
      {/* <Divider /> */}
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column" padding="0px 11px 0px 11px">
          <HeadingLinear>{t('Prize Funds')}</HeadingLinear>
          <Text color="textSubtle" fontSize="20px">
            {t('The prizes for each lottery round come from three sources:')}
          </Text>
          <Heading my="16px" scale="md" fontSize="20px">
            {t('Ticket Purchases')}
          </Heading>
          <BulletList>
            <li>
              <Text display="inline" color="textSubtle" fontSize="16px">
                {t('100% of the GENI paid by people buying tickets that round goes back into the prize pools.')}
              </Text>
            </li>
          </BulletList>
          <Heading my="16px" scale="md" fontSize="20px">
            {t('Rollover Prizes')}
          </Heading>
          <BulletList>
            <li>
              <Text display="inline" color="textSubtle" fontSize="16px">
                {t(
                  'After every round, if nobody wins in one of the prize brackets, the unclaimed GENI for that bracket rolls over into the next round and are redistributed among the prize pools.',
                )}
              </Text>
            </li>
          </BulletList>
          <Heading my="16px" scale="md" fontSize="20px">
            {t('GENI Injections')}
          </Heading>
          <BulletList>
            <li>
              <Text display="inline" color="textSubtle" fontSize="16px">
                {t(
                  'An average total of 35,000 GENI from the treasury is added to lottery rounds over the course of a week. This GENI is of course also included in rollovers! Read more in our guide to GENI Tokenomics',
                )}
                {/* <InlineLink href="https://docs.pancakeswap.finance/tokenomics/cake/cake-tokenomics">
                  {t('GENI Tokenomics')}
                </InlineLink> */}
              </Text>
            </li>
          </BulletList>
        </Flex>
        <Flex flex="1" justifyContent="center">
          <PoolAllocations />
        </Flex>
      </GappedFlex>
      {/* <Divider /> */}
    </Box>
  )
}

export default HowToPlay
