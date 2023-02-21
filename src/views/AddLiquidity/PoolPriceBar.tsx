import { Currency, Percent, Price } from '@gemuni/sdk'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

const TextTransparent = styled('p')`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  background: ${({ theme }) => theme.colors.bgPrimaryButton};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-right: 8px;
`
function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <TextTransparent>{price?.toSignificant(6) ?? '-'}</TextTransparent>
          <Text fontSize="14px" pt={1}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? '',
              assetB: currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? '',
            })}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TextTransparent>{price?.invert()?.toSignificant(6) ?? '-'}</TextTransparent>
          <Text fontSize="14px" pt={1}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? '',
              assetB: currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? '',
            })}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <TextTransparent>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TextTransparent>
          <Text fontSize="14px" pt={1}>
            {t('Share of Pool')}
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

export default PoolPriceBar
