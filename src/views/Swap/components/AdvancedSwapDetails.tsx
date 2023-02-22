import { Trade, TradeType } from '@techchainswapfinance/sdk'
import { Text } from '@pancakeswap/uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'

const CustomText = styled(Text)`
  background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn gap="4px" style={{ borderTop: '1px solid rgba(129, 75, 246, 0.4)', paddingTop: '24px' }}>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </Text>
          <QuestionHelper
            text={t(
              'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
            )}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <RowFixed>
          <CustomText fontSize="14px">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.getSymbol(
                  chainId,
                )}` ?? '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.getSymbol(
                  chainId,
                )}` ?? '-'}
          </CustomText>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Price Impact')}
          </Text>
          <QuestionHelper
            text={t('The difference between the market price and estimated price due to trade size.')}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Liquidity Provider Fee')}
          </Text>
          <QuestionHelper
            text={
              <>
                <div style={{ marginBottom: '12px' }}>
                  {t('For each trade a %amount% fee is paid', { amount: '0.25%' })}
                </div>
                <div>- {t('%amount% to LP token holders', { amount: '0.17%' })}</div>
                <div>- {t('%amount% to the Treasury', { amount: '0.03%' })}</div>
                <div>- {t('%amount% towards GENI buyback and burn', { amount: '0.05%' })}</div>
              </>
            }
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <CustomText fontSize="14px">
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.getSymbol(chainId)}` : '-'}
        </CustomText>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Text fontSize="14px" color="textSubtle">
                    {t('Route')}
                  </Text>
                  <QuestionHelper
                    text={t('Routing through these tokens resulted in the best price for your trade.')}
                    ml="4px"
                    placement="top-start"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
