import { Price } from '@gemuni/sdk'
import { IconButton, Text } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)
  const { chainId } = useActiveWeb3React()

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.getSymbol(chainId)} = ${price?.baseCurrency?.getSymbol(chainId)}`
    : `${price?.baseCurrency?.getSymbol(chainId)} = ${price?.quoteCurrency?.getSymbol(chainId)}`

  return (
    <Text style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      {show ? (
        <>
          <Text color="textSubtle" fontSize="14px" textAlign="center">
            {formattedPrice ?? '-'} {label}
          </Text>
          <IconButton variant="text" scale="sm" onClick={() => setShowInverted(!showInverted)}>
            <img src="images/swap/Group.png" alt="Switch" />
          </IconButton>
          {/* <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <AutoRenewIcon width="14px" />
          </StyledBalanceMaxMini> */}
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
