import { Box, Flex, Heading, Image, Link, Skeleton, Text } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useEffect, useState } from 'react'
import { useFetchLottery, useLottery } from 'state/lottery/hooks'
import styled from 'styled-components'
import { PageMeta } from '../../components/Layout/Page'
import AllHistoryCard from './components/AllHistoryCard'
import CheckPrizesSection from './components/CheckPrizesSection'
import Countdown from './components/Countdown'
import Hero from './components/Hero'
import HistoryTabMenu from './components/HistoryTabMenu'
import HowToPlay from './components/HowToPlay'
import NextDrawCard from './components/NextDrawCard'
import YourHistoryCard from './components/YourHistoryCard'
import useGetNextLotteryEvent from './hooks/useGetNextLotteryEvent'
import useShowMoreUserHistory from './hooks/useShowMoreUserRounds'
import useStatusTransitions from './hooks/useStatusTransitions'
import { BACKGROUND_TRANSPARENT, FINISHED_ROUNDS_BG } from './pageSectionStyles'

const LotteryPage = styled.div`
  min-height: calc(100vh - 64px);
  background-image: url('/images/lottery/background_lottery.webp');
  background-size: cover;
  background-repeat: no-repeat;
  & div,
  span,
  button,
  h2,
  h1,
  p,
  ul,
  li {
    font-family: 'Inter';
  }
`
const TextSubContent = styled.p`
  margin-bottom: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  line-height: 110%;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 4px 20px #8668df;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 110%;
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
const FooterHowToPlay = styled.div`
  padding: 68px 0px 74px 0px;
  background: rgba(43, 27, 78, 0.4);
  border: 1px solid rgba(129, 75, 246, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(129, 75, 246, 0.2);
  backdrop-filter: blur(10px);
`
const TextHeading = styled.h2`
  font-size: 16px;
  text-transform: uppercase;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 54px;
  }
`
const WrapTextHeading = styled(Flex)`
  gap: 5px;
  .special {
    background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 16px;
    text-transform: uppercase;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 54px;
    }
  }
`
const SubTextHeading = styled.h4`
  font-size: 16px;
  padding: 8px 0;
  font-weight: 800;
  text-align: center;
  color: #f8ecb6;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
  }
`
const TextDate = styled.h3`
  text-align: center;
  font-weight: 800;
  font-size: 16px;
  line-height: 60px;
  margin-top: -10px;
  font-family: 'Inter';
  margin-bottom: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 39px;
  }
`
const WrapSectionHero = styled(PageSection)`
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: -96px;
  }
`

const Lottery = () => {
  useStatusTransitions()
  const { t } = useTranslation()
  const { isDark, theme } = useTheme()
  const {
    currentRound: { status, endTime },
  } = useLottery()
  const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime, postCountdownText, preCountdownText } = useGetNextLotteryEvent(endTimeAsInt, status)
  useFetchLottery(nextEventTime)
  const { numUserRoundsRequested, handleShowMoreUserRounds } = useShowMoreUserHistory()

  return (
    <>
      <PageMeta />
      <LotteryPage>
        <WrapSectionHero background="transparent" index={1} hasCurvedDivider={false}>
          <Hero />
        </WrapSectionHero>
        <PageSection
          containerProps={{
            style: {
              marginTop: '-30px',
              border: '1px solid rgba(129, 75, 246, 0.2)',
              boxShadow: '0px 1px 0px rgb(0 0 0 / 25%), inset 0px 1px 0px rgb(129 75 246 / 20%)',
              backdropFilter: 'blur(10px)',
              boxSizing: 'border-box',
            },
          }}
          background={BACKGROUND_TRANSPARENT}
          concaveDivider
          clipFill={{ light: '#7645D9' }}
          dividerPosition="top"
          hasCurvedDivider={false}
          index={2}
        >
          <Flex alignItems="center" justifyContent="center" flexDirection="column" pt="24px">
            {/* {status === LotteryStatus.OPEN && (
              <Heading scale="xl" color="#ffffff" mb="24px" textAlign="center">
                {t('Get your tickets now!')}
              </Heading>
            )} */}
            <WrapTextHeading>
              <TextHeading style={{ fontFamily: 'Inter' }}>{t('summer party')}</TextHeading>
              <TextHeading className="special" style={{ fontFamily: 'Inter' }}>
                {t('international')}
              </TextHeading>
              <TextHeading style={{ fontFamily: 'Inter' }}>{t('cup')}</TextHeading>
            </WrapTextHeading>
            <SubTextHeading style={{ fontFamily: 'Martel Sans' }}>{t('Our Tournament starts at')}</SubTextHeading>
            <TextDate>09:00 AM, Jan 19, 2022 (UTC)</TextDate>
            {/* {status !== LotteryStatus.CLOSE && ( */}
            <Heading paddingBottom="20px" fontSize="28px">
              {preCountdownText}
            </Heading>
            <Flex alignItems="center" justifyContent="center" mb="30px">
              {nextEventTime && (postCountdownText || preCountdownText) ? (
                <Countdown nextEventTime={nextEventTime} postCountdownText={postCountdownText} />
              ) : (
                <Skeleton height="41px" width="250px" />
              )}
            </Flex>
            {/* )} */}
            <NextDrawCard />
          </Flex>
        </PageSection>
        <PageSection background={BACKGROUND_TRANSPARENT} hasCurvedDivider={false} index={2}>
          <CheckPrizesSection />
        </PageSection>
        <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={isDark ? BACKGROUND_TRANSPARENT : FINISHED_ROUNDS_BG}
          hasCurvedDivider={false}
          index={2}
        >
          <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <TextSubContent>{t('Finished Rounds')}</TextSubContent>
            <Box mb="24px">
              <HistoryTabMenu
                activeIndex={historyTabMenuIndex}
                setActiveIndex={(index) => setHistoryTabMenuIndex(index)}
              />
            </Box>
            {historyTabMenuIndex === 0 ? (
              <AllHistoryCard />
            ) : (
              <YourHistoryCard
                handleShowMoreClick={handleShowMoreUserRounds}
                numUserRoundsRequested={numUserRoundsRequested}
              />
            )}
          </Flex>
        </PageSection>
        <PageSection background={BACKGROUND_TRANSPARENT} index={2} hasCurvedDivider={false}>
          <HowToPlay />
        </PageSection>
        <FooterHowToPlay>
          <Flex justifyContent="center" alignItems="center" flexDirection={['column', 'column', 'row']}>
            <Image width={240} height={172} src="/images/lottery/tombola.webp" alt="tombola bunny" mr="8px" mb="16px" />
            {/* <Flex maxWidth="300px" flexDirection="column">
              <Heading mb="16px" scale="md" fontSize="24px">
                {t('Still got questions?')}
              </Heading>
              <Text fontSize="24px" width="467px">
                {t('Check our in-depth guide on')}{' '}
                <InlineLink href="https://docs.pancakeswap.finance/products/lottery/lottery-guide" fontSize="24px">
                  {t('how to play the Gemuni Exchange lottery!')}
                </InlineLink>
              </Text>
            </Flex> */}
          </Flex>
        </FooterHowToPlay>
      </LotteryPage>
    </>
  )
}

export default Lottery
