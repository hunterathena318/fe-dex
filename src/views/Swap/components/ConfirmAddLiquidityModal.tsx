import React, { useCallback } from 'react'
import { Currency, CurrencyAmount, Fraction, Percent, Token, TokenAmount } from '@techchainswapfinance/sdk'
import { Flex, InjectedModalProps, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import { AutoColumn } from 'components/Layout/Column'
import Row from 'components/Layout/Row'
import { Field } from 'state/burn/actions'
import { DoubleCurrencyLogo } from 'components/Logo'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConfirmAddModalBottom from '../../AddLiquidity/ConfirmAddModalBottom'

const TextGradient = styled.p`
  font-size: 48px;
  font-weight: 600;
  line-height: 1.5;
  font-family: Poppins;
  text-align: center;
  background: ${({ theme }) => theme.colors.bgPrimaryButton};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 10px;
`
interface ConfirmAddLiquidityModalProps {
  title: string
  customOnDismiss: () => void
  attemptingTxn: boolean
  hash: string
  pendingText: string
  currencies: { [field in Field]?: Currency }
  noLiquidity: boolean
  allowedSlippage: number
  liquidityErrorMessage: string
  price: Fraction
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  onAdd: () => void
  poolTokenPercentage: Percent
  liquidityMinted: TokenAmount
  currencyToAdd: Token
}

const ConfirmAddLiquidityModal: React.FC<InjectedModalProps & ConfirmAddLiquidityModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  price,
  currencies,
  noLiquidity,
  allowedSlippage,
  parsedAmounts,
  liquidityErrorMessage,
  onAdd,
  poolTokenPercentage,
  liquidityMinted,
  currencyToAdd,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const modalHeader = useCallback(() => {
    return noLiquidity ? (
      <Flex alignItems="center">
        <TextGradient>{`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}/${currencies[Field.CURRENCY_B]?.getSymbol(
          chainId,
        )}`}</TextGradient>
        <DoubleCurrencyLogo
          currency0={currencies[Field.CURRENCY_A]}
          currency1={currencies[Field.CURRENCY_B]}
          size={30}
        />
      </Flex>
    ) : (
      <AutoColumn>
        <Flex alignItems="center">
          <TextGradient>{liquidityMinted?.toSignificant(6)}</TextGradient>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </Flex>
        <Row>
          <Text fontSize="24px">
            {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}/${currencies[Field.CURRENCY_B]?.getSymbol(
              chainId,
            )} Pool Tokens`}
          </Text>
        </Row>
        <Text small textAlign="left" my="24px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </AutoColumn>
    )
  }, [currencies, liquidityMinted, allowedSlippage, noLiquidity, t])

  const modalBottom = useCallback(() => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }, [currencies, noLiquidity, onAdd, parsedAmounts, poolTokenPercentage, price])

  const confirmationContent = useCallback(
    () =>
      liquidityErrorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={liquidityErrorMessage} />
      ) : (
        <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
      ),
    [onDismiss, modalBottom, modalHeader, liquidityErrorMessage],
  )

  return (
    <TransactionConfirmationModal
      title={title}
      onDismiss={onDismiss}
      customOnDismiss={customOnDismiss}
      attemptingTxn={attemptingTxn}
      currencyToAdd={currencyToAdd}
      hash={hash}
      content={confirmationContent}
      pendingText={pendingText}
    />
  )
}

export default ConfirmAddLiquidityModal
