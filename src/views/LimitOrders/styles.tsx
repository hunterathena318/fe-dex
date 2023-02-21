import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const Wrapper = styled(Flex)`
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 120px' : 'padding: 0 40px')};
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  min-width: 343px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 451px;
  }
`
