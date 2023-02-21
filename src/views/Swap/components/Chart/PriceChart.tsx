import { Button, Flex, IconButton, Image, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { DoubleCurrencyLogo } from 'components/Logo'
// import { TradingViewLabel } from 'components/TradingView'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChartViewMode } from 'state/user/actions'
import { useExchangeChartViewManager } from 'state/user/hooks'
import styled from 'styled-components'
import BasicChart from './BasicChart'
import { StyledPriceChart } from './styles'
// import TradingViewChart from './TradingViewChart'
// import PairPriceDisplay from '../../../../components/PairPriceDisplay'

const ChartButton = styled(Button)`
  background-color: ${({ $active, theme }) => $active && `${theme.colors.primary}0f`};
  padding: 4px 8px;
  border-radius: 6px;
`

const PriceChart = ({
  inputCurrency,
  outputCurrency,
  onSwitchTokens,
  isDark,
  isChartExpanded,
  setIsChartExpanded,
  isMobile,
  isFullWidthContainer,
  token0Address,
  token1Address,
  currentSwapPrice,
}) => {
  const { isDesktop } = useMatchBreakpoints()
  const toggleExpanded = () => setIsChartExpanded((currentIsExpanded) => !currentIsExpanded)
  const [chartView, setChartView] = useExchangeChartViewManager()
  // const [twChartSymbol, setTwChartSymbol] = useState('')
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  // const handleTwChartSymbol = useCallback((symbol) => {
  //   setTwChartSymbol(symbol)
  // }, [])

  return (
    <StyledPriceChart
      height={chartView === ChartViewMode.TRADING_VIEW ? '100%' : '70%'}
      overflow={chartView === ChartViewMode.TRADING_VIEW ? 'hidden' : 'unset'}
      $isDark={isDark}
      $isExpanded={isChartExpanded}
      $isFullWidthContainer={isFullWidthContainer}
    >
      <Flex justifyContent="space-between" px="24px">
        <Flex alignItems="center">
          {outputCurrency ? (
            <>
              <DoubleCurrencyLogo currency0={inputCurrency} currency1={outputCurrency} size={24} margin />
              <Text color="text" bold fontSize="18px">
                {`${inputCurrency?.getSymbol(chainId)}/`}
              </Text>
              <Text color="gray" bold fontSize="18px">
                {outputCurrency.getSymbol(chainId)}
              </Text>
            </>
          ) : (
            inputCurrency && (
              <DoubleCurrencyLogo currency0={inputCurrency} currency1={outputCurrency} size={24} margin />
            )
          )}
          {/* {outputCurrency && (
            <Text color="text" bold>
              {outputCurrency ? `${inputCurrency.getSymbol(chainId)}/${outputCurrency.getSymbol(chainId)}` : `${inputCurrency.getSymbol(chainId)  }/`}
            </Text>
          )}
          {inputCurrency && (
            <Text color="gray" bold>
              {inputCurrency ? `${inputCurrency.getSymbol(chainId)}/${outputCurrency.getSymbol(chainId)}` : inputCurrency.getSymbol(chainId)}
            </Text>
          )} */}
          <IconButton variant="text" onClick={onSwitchTokens}>
            <Image src="/icons/arrow-exchange-swap.svg" width={24} height={24} />
          </IconButton>
        </Flex>
        {/* {!isMobile  && (
          <Flex>
            <IconButton variant="text" onClick={toggleExpanded}>
              {isChartExpanded ? <ShrinkIcon color="text" /> : <ExpandIcon color="text" />}
            </IconButton>
          </Flex>
        )} */}
      </Flex>
      {chartView === ChartViewMode.BASIC && (
        <BasicChart
          token0Address={token0Address}
          token1Address={token1Address}
          isChartExpanded={isChartExpanded}
          inputCurrency={inputCurrency}
          outputCurrency={outputCurrency}
          isMobile={isMobile}
          currentSwapPrice={currentSwapPrice}
        />
      )}
      {/* {chartView === ChartViewMode.TRADING_VIEW && (
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height={isMobile ? '100%' : isChartExpanded ? 'calc(100% - 48px)' : '458px'}
          pt="12px"
        >
          <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
            <PairPriceDisplay
              value={currentSwapPrice?.[token0Address]}
              inputSymbol={inputCurrency?.getSymbol(chainId)}
              outputSymbol={outputCurrency?.getSymbol(chainId)}
              mx="24px"
            />
            {twChartSymbol && <TradingViewLabel symbol={twChartSymbol} />}
          </Flex>
          <TradingViewChart
            // unmount the whole component when symbols is changed
            key={`${inputCurrency?.getSymbol(chainId)}-${outputCurrency?.getSymbol(chainId)}`}
            inputSymbol={inputCurrency?.getSymbol(chainId)}
            outputSymbol={outputCurrency?.getSymbol(chainId)}
            isDark={isDark}
            onTwChartSymbol={handleTwChartSymbol}
          />
        </Flex>
      ) */}
    </StyledPriceChart>
  )
}

export default PriceChart
