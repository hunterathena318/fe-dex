import { Currency, CurrencyAmount, Fraction, Percent } from '@gemuni/sdk'
import { Button, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import { CurrencyLogo } from '../../components/Logo'
import { Field } from '../../state/mint/actions'

function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  return (
    <>
      <RowBetween>
        <Text>{t('%asset% Deposited', { asset: currencies[Field.CURRENCY_A]?.getSymbol(chainId) })}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{t('%asset% Deposited', { asset: currencies[Field.CURRENCY_B]?.getSymbol(chainId) })}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{t('Rates')}</Text>
        <Text>
          {`1 ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} = ${price?.toSignificant(4)} ${currencies[
            Field.CURRENCY_B
          ]?.getSymbol(chainId)}`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text>
          {`1 ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} = ${price?.invert().toSignificant(4)} ${currencies[
            Field.CURRENCY_A
          ]?.getSymbol(chainId)}`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text>{t('Share of Pool')}:</Text>
        <Text>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <Button width="100%" onClick={onAdd} mt="20px" variant="linear">
        {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
