import React from 'react'
import { Currency, Percent, Price } from '@gemuni/sdk'
import styled from 'styled-components'
import { Input, Flex, Text, Button, AutoRenewIcon, SyncAltIcon, HelpIcon, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { escapeRegExp } from 'utils'
import { Rate } from 'state/limitOrders/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getRatePercentageMessage, PercentageDirection } from '../utils/getRatePercentageMessage'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const OrderPriceInput = styled(Input)`
  text-align: right;
  border: ${({ theme }) => theme.colors.borderBtn};
  height: 56px;
`

const LabelContainer = styled(Flex)`
  cursor: pointer;
`
const GrandientText = styled(Text)`
  background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

interface LimitOrderPriceProps {
  id: string
  value: string
  onUserInput: (value: string) => void
  inputCurrency: Currency
  outputCurrency: Currency
  percentageRateDifference: Percent
  rateType: Rate
  handleRateType: (rateType: Rate, price?: Price) => void
  price: Price
  handleResetToMarketPrice: () => void
  realExecutionPriceAsString: string
  disabled: boolean
}

const DIRECTION_COLORS = {
  [PercentageDirection.ABOVE]: 'success',
  [PercentageDirection.BELOW]: 'failure',
  [PercentageDirection.MARKET]: 'textSubtle',
}

const LimitOrderPrice: React.FC<LimitOrderPriceProps> = ({
  id,
  value,
  onUserInput,
  inputCurrency,
  outputCurrency,
  percentageRateDifference,
  rateType,
  handleRateType,
  price,
  handleResetToMarketPrice,
  realExecutionPriceAsString,
  disabled,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const hasCurrencyInfo = inputCurrency && outputCurrency
  const label =
    rateType === Rate.MUL
      ? `${outputCurrency?.getSymbol(chainId)} per ${inputCurrency?.getSymbol(chainId)}`
      : `${inputCurrency?.getSymbol(chainId)} per ${outputCurrency?.getSymbol(chainId)}`

  const toggleRateType = () => {
    handleRateType(rateType, price)
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text color="textDark">
        {t(
          'Takes into account the gas necessary to execute your order and guarantees that your desired rate is fulfilled.',
        )}
      </Text>
      <Text color="textDark">{t('It fluctuates according to gas prices.')}</Text>
      {inputCurrency?.getSymbol(chainId) && outputCurrency?.getSymbol(chainId) && realExecutionPriceAsString && (
        <Text color="textDark">
          {realExecutionPriceAsString === 'never executes'
            ? t(
                'Assuming current gas price this order will never execute. Try increasing the amount of tokens to swap.',
              )
            : t('Assuming current gas price it should execute when 1 %assetOneSymbol% = %price% %assetTwoSymbol%', {
                assetOneSymbol:
                  rateType === Rate.MUL ? inputCurrency?.getSymbol(chainId) : outputCurrency?.getSymbol(chainId),
                assetTwoSymbol:
                  rateType === Rate.MUL ? outputCurrency?.getSymbol(chainId) : inputCurrency?.getSymbol(chainId),
                price: realExecutionPriceAsString,
              })}
        </Text>
      )}
    </>,
    { placement: 'top' },
  )

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextUserInput = event.target.value.replace(/,/g, '.')
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  const isAtMarketPrice = percentageRateDifference?.equalTo(0) ?? true
  const [ratePercentageMessage, direction] = getRatePercentageMessage(percentageRateDifference, t)
  const priceLabelColor = DIRECTION_COLORS[direction]
  return (
    <>
      <Flex justifyContent="space-between" id={id} mt="24px">
        <Flex alignItems="center">
          <Text mr="8px" color="textSubtle" fontSize="14px">
            {t('Price')}
          </Text>
          <Button
            style={{ borderRadius: '4px' }}
            onClick={handleResetToMarketPrice}
            startIcon={<AutoRenewIcon color={isAtMarketPrice ? 'textDisabled' : 'primary'} />}
            variant="tertiary"
            scale="xs"
            disabled={isAtMarketPrice}
          >
            <Text
              fontSize="12px"
              bold
              color={isAtMarketPrice ? 'textDisabled' : 'text'}
              textTransform="uppercase"
              marginLeft={10}
            >
              {t('Market')}
            </Text>
          </Button>
        </Flex>
        {ratePercentageMessage && (
          <GrandientText color={priceLabelColor} fontSize="12px">
            {ratePercentageMessage}
          </GrandientText>
        )}
      </Flex>
      <OrderPriceInput
        value={value}
        disabled={disabled}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        type="text"
        inputMode="decimal"
      />
      {hasCurrencyInfo && (
        <LabelContainer justifyContent="flex-end" alignItems="center" onClick={toggleRateType} mt="24px">
          <Text small bold color="grey">
            {label}
          </Text>
          <SyncAltIcon color="textSubtle" width="24px" ml="4px" />
        </LabelContainer>
      )}
      <Flex justifySelf="flex-end" mb="8px" minHeight="16px">
        {realExecutionPriceAsString && (
          <>
            <Text small color="textSubtle" mr="4px">
              {t('Real execution price: %price%', { price: realExecutionPriceAsString })}
            </Text>
            <span ref={targetRef}>
              <HelpIcon color="textSubtle" />
              {tooltipVisible && tooltip}
            </span>
          </>
        )}
      </Flex>
    </>
  )
}

export default LimitOrderPrice
