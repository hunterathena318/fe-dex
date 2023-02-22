import { Currency, ETHER, Token } from '@techchainswapfinance/sdk'
import { BinanceIcon } from '@pancakeswap/uikit'
import { CHAIN_ID } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const { chainId } = useActiveWeb3React()
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [
        currency.symbol === 'GENI'
          ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/14649.png'
          : getTokenLogoURL(currency.address),
      ]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER && chainId) {
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      return (
        <StyledLogo
          size={size}
          style={style}
          alt="MATIC logo"
          srcs={[
            'https://assets-cdn.trustwallet.com/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png',
          ]}
        />
      )
    }
    if (chainId === CHAIN_ID.MAINNET || chainId === CHAIN_ID.RINKEBY) {
      return (
        <StyledLogo
          size={size}
          style={style}
          alt="MATIC logo"
          srcs={[
            'https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
          ]}
        />
      )
    }
    if (chainId === CHAIN_ID.AVALANCHE) {
      return (
        <StyledLogo
          size={size}
          style={style}
          alt="AVAX logo"
          srcs={[
            'https://raw.githubusercontent.com/sushiswap/logos/main/network/avalanche/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7.jpg',
          ]}
        />
      )
    }

    return <BinanceIcon width={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.getSymbol(chainId) ?? 'token'} logo`} style={style} />
}
