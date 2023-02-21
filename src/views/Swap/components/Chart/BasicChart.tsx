import { Box, ButtonMenu, ButtonMenuItem, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useState, memo } from 'react'
import { useFetchPairPrices } from 'state/swap/hooks'
import dynamic from 'next/dynamic'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import NoChartAvailable from './NoChartAvailable'
import PairPriceDisplay from '../../../../components/PairPriceDisplay'
import { getTimeWindowChange } from './utils'

const BoxButtonMenu = styled('div')<{
  activeIndex: number
}>`
  div {
    border: none;
    background: none;
  }
  button {
    color: #fff;
    border-radius: 12px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }
  button:nth-child(${({ activeIndex }) => activeIndex + 1}) {
    background-color: #3b3c4e !important;
  }
`
const TextLabel = styled(Text)`
  font-size: 32px;
  line-height: 1.1;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 48px;
  }
`

const BoxValueTime = styled('div')`
  display: flex;
  align-items: center;
  div {
    line-height: 24px;
  }
`
const TextTransparent = styled('p')`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-right: 8px;
`

const SwapLineChart = dynamic(() => import('./SwapLineChart'), {
  ssr: false,
})

const BasicChart = ({
  token0Address,
  token1Address,
  isChartExpanded,
  inputCurrency,
  outputCurrency,
  isMobile,
  currentSwapPrice,
}) => {
  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0)

  const { pairPrices = [], pairId } = useFetchPairPrices({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
    token0: inputCurrency,
    token1: outputCurrency,
  })
  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const valueToDisplay = hoverValue || pairPrices[pairPrices.length - 1]?.value
  const { changePercentage, changeValue } = getTimeWindowChange(pairPrices)
  const isChangePositive = changeValue >= 0
  const chartHeight = isChartExpanded ? 'calc(100% - 120px)' : '378px'
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const currentDate = new Date().toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  // Sometimes we might receive array full of zeros for obscure tokens while trying to derive data
  // In that case chart is not useful to users
  const isBadData =
    pairPrices &&
    pairPrices.length > 0 &&
    pairPrices.every(
      (price) => !price.value || price.value === 0 || price.value === Infinity || Number.isNaN(price.value),
    )

  if (isBadData) {
    return (
      <NoChartAvailable
        token0Address={token0Address}
        token1Address={token1Address}
        pairAddress={pairId}
        isMobile={isMobile}
      />
    )
  }
  const checkPastTime = () => {
    switch (timeWindow) {
      case 0:
        return t('Past 24 Hours')
      case 1:
        return t('Past 1 Week')
      case 2:
        return t('Past 1 Month')

      default:
        return t('Past 24 Hours')
    }
  }

  return (
    <>
      <Flex
        flexDirection={['column', null, null, null, null, null, 'row']}
        alignItems={['flex-start', null, null, null, null, null, 'center']}
        justifyContent="space-between"
        px="24px"
      >
        <Flex flexDirection="column" pt="12px">
          <PairPriceDisplay
            value={pairPrices?.length > 0 && valueToDisplay}
            inputSymbol={inputCurrency?.getSymbol(chainId)}
            // outputSymbol={outputCurrency?.getSymbol(chainId)}
          >
            {outputCurrency && (
            <Text fontSize='24px' fontWeight='600' color= 'rgb(122, 110, 170)'>
                {outputCurrency ? <span>{`${inputCurrency.getSymbol(chainId)}/${outputCurrency.getSymbol(chainId)}`}</span> : `${inputCurrency.getSymbol(chainId)  }/`}
            </Text>
          )}
           {/*
            {/* <TextLabel mr="8px" bold>
              {inputCurrency ? inputCurrency?.getSymbol(chainId) : outputCurrency?.getSymbol(chainId)}
            </TextLabel> */}
          </PairPriceDisplay>
          <BoxValueTime>
            <TextTransparent>
              {`${isChangePositive ? '+' : ''}${changeValue.toFixed(3)} ${inputCurrency?.getSymbol(chainId) ?? ''}`}
            </TextTransparent>
            <Text small color="#fff">
              {checkPastTime()}
            </Text>
          </BoxValueTime>
        </Flex>
        <Box>
          <BoxButtonMenu activeIndex={timeWindow}>
            <ButtonMenu activeIndex={timeWindow} onItemClick={setTimeWindow} scale="sm">
              <ButtonMenuItem>{t('24H')} </ButtonMenuItem>
              <ButtonMenuItem>{t('1W')}</ButtonMenuItem>
              <ButtonMenuItem>{t('1M')}</ButtonMenuItem>
              {/* <ButtonMenuItem>{t('1Y')}</ButtonMenuItem> */}
            </ButtonMenu>
          </BoxButtonMenu>
        </Box>
      </Flex>
      <Box height={isMobile ? '100%' : chartHeight} p={isMobile ? '0px' : '16px'} width="100%">
        <SwapLineChart
          data={pairPrices}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositive}
          timeWindow={timeWindow}
        />
      </Box>
    </>
  )
}

export default memo(BasicChart, (prev, next) => {
  return (
    prev.token0Address === next.token0Address &&
    prev.token1Address === next.token1Address &&
    prev.isChartExpanded === next.isChartExpanded &&
    prev.isMobile === next.isMobile &&
    prev.isChartExpanded === next.isChartExpanded &&
    ((prev.currentSwapPrice !== null &&
      next.currentSwapPrice !== null &&
      prev.currentSwapPrice[prev.token0Address] === next.currentSwapPrice[next.token0Address] &&
      prev.currentSwapPrice[prev.token1Address] === next.currentSwapPrice[next.token1Address]) ||
      (prev.currentSwapPrice === null && next.currentSwapPrice === null))
  )
})
