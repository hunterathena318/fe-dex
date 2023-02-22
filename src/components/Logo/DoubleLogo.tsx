import { Currency } from '@techchainswapfinance/sdk'
import styled from 'styled-components'
import CurrencyLogo from './CurrencyLogo'

const Wrapper = styled.div<{ margin: boolean }>`
  display: flex;
  flex-direction: row;
  margin-right: ${({ margin }) => margin && '4px'};
`
const StyledBoxIcon = styled('div')`
  display: flex;
  align-items: center;
  flex-grow: 0;
`
const StyledBoxIconGenumiSpace = styled('div')`
  display: flex;
  align-items: center;
  margin-left: -9px;
`

interface DoubleCurrencyLogoProps {
  margin?: boolean
  size?: number
  currency0?: Currency
  currency1?: Currency
}

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  size = 20,
  margin = false,
}: DoubleCurrencyLogoProps) {
  return (
    <Wrapper margin={margin}>
      <StyledBoxIcon>
        {currency0 && (
          <CurrencyLogo currency={currency0} size={`${size.toString()}px`} style={{ marginRight: '4px' }} />
        )}
        {currency1 && (
          <StyledBoxIconGenumiSpace>
            <CurrencyLogo currency={currency1} size={`${size.toString()}px`} style={{ marginRight: '4px' }} />
          </StyledBoxIconGenumiSpace>
        )}
      </StyledBoxIcon>
    </Wrapper>
  )
}
