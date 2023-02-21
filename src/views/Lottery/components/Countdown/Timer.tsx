import styled from 'styled-components'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'

export interface TimerProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
  wrapperClassName?: string
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
  gap: 10px;
`
const WrapTimer = styled(Flex)`
  padding: 40px 35px;
  background: #876de2;
  width: 71px;
  height: 71px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  h2 {
    line-height: 60px;
    font-weight: 800;
    font-size: 24px;
    color: #876de2;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
    letter-spacing: 0.2em;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 140px;
    height: 140px;
    h2 {
      font-size: 60px;
      letter-spacing: 0em;
    }
  }
`
const WrapTimerContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 5px;
  div:last-child {
    font-size: 12px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    div:last-child {
      font-size: 16px;
    }
  }
`

const StyledTimerText = styled(Heading)`
  font-size: 60px;
  font-family: 'Inter';
`
const StyledTimerTextGold = styled(Heading)`
  background: ${({ theme }) => theme.colors.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Wrapper: React.FC<TimerProps> = ({ minutes, hours, days, seconds, wrapperClassName }) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()

  return (
    <>
      {pathname.includes('lottery') ? (
        <StyledTimerFlex alignItems="flex-end" className={wrapperClassName}>
          {Boolean(days) && (
            <WrapTimerContainer>
              <WrapTimer>
                <StyledTimerText mb="-4px" scale="xl" mr="4px">
                  {days}
                </StyledTimerText>
              </WrapTimer>
              <Text>Days</Text>
            </WrapTimerContainer>
          )}
          {Boolean(hours) && (
            <WrapTimerContainer>
              <WrapTimer>
                <StyledTimerText mb="-4px" scale="xl" mr="4px">
                  {hours}
                </StyledTimerText>
              </WrapTimer>
              <Text>Hours</Text>
            </WrapTimerContainer>
          )}
          {Boolean(minutes) && (
            <WrapTimerContainer>
              <WrapTimer>
                <StyledTimerText mb="-4px" scale="xl" mr="4px">
                  {minutes}
                </StyledTimerText>
              </WrapTimer>
              <Text>Minutes</Text>
            </WrapTimerContainer>
          )}
          {Boolean(seconds) && (
            <WrapTimerContainer>
              <WrapTimer>
                <StyledTimerText mb="-4px" scale="xl" mr="4px">
                  {seconds >= 10 ? seconds : `0${seconds}`}
                </StyledTimerText>
              </WrapTimer>
              <Text>Seconds</Text>
            </WrapTimerContainer>
          )}
          {!seconds && (
            <WrapTimerContainer>
              <WrapTimer>
                <StyledTimerText mb="-4px" scale="xl" mr="4px">
                  00
                </StyledTimerText>
              </WrapTimer>
              <Text>Seconds</Text>
            </WrapTimerContainer>
          )}
        </StyledTimerFlex>
      ) : (
        <StyledTimerFlex alignItems="flex-end" className={wrapperClassName}>
          {Boolean(days) && (
            <>
              <StyledTimerTextGold mb="-4px" scale="xl" mr="4px">
                {days}
              </StyledTimerTextGold>
              <StyledTimerTextGold mr="12px">{t('d')}</StyledTimerTextGold>
            </>
          )}
          {Boolean(hours) && (
            <>
              <StyledTimerTextGold mb="-4px" scale="xl" mr="4px">
                {hours}
              </StyledTimerTextGold>
              <StyledTimerTextGold mr="12px">{t('h')}</StyledTimerTextGold>
            </>
          )}
          {Boolean(minutes) && (
            <>
              <StyledTimerTextGold mb="-4px" scale="xl" mr="4px">
                {minutes}
              </StyledTimerTextGold>
              <StyledTimerTextGold mr="12px">{t('m')}</StyledTimerTextGold>
            </>
          )}
          {Boolean(seconds) && (
            <>
              <StyledTimerTextGold mb="-4px" scale="xl" mr="4px">
                {seconds}
              </StyledTimerTextGold>
              <StyledTimerTextGold mr="12px">{t('s')}</StyledTimerTextGold>
            </>
          )}
        </StyledTimerFlex>
      )}
    </>
  )
}

export default Wrapper
