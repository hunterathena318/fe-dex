import { Currency } from '@gemuni/sdk'
import CurrencyLogo from 'components/Logo/CurrencyLogo'
import TextIcon from './TextIcon'

interface CurrencyFormatProps {
  currency: Currency
  chainId: number
  bold?: boolean
}

const CurrencyFormat: React.FC<CurrencyFormatProps> = ({ currency, bold, chainId }) => {
  return <TextIcon bold={bold} text={currency?.getSymbol(chainId)} icon={<CurrencyLogo currency={currency} />} />
}

export default CurrencyFormat
