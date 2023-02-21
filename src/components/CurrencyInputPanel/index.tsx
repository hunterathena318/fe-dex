import { Currency, Pair, Token } from '@gemuni/sdk'
import { Box, Button, ChevronDownIcon, Flex, Text, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import { isAddress } from 'utils'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ accounted: boolean }>`
  padding: 0 0.5rem;
  position: absolute;
  top: ${({ accounted }) => (accounted ? '50%' : '33%')};
  left: 10px;
  z-index: 9;
`
const AvaiableLayout = styled.div`
  display: flex;
  align-items: center;
`
const MaxButton = styled(Button).attrs({ variant: 'linear', scale: 'sm' })<{ accounted: boolean }>`
  width: 30px;
  height: 100%;
  font-size: 10px;
  border-radius: 4px;
  margin-left: 10px;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 1rem;
  border: ${({ theme }) => theme.colors.borderBtn};
  border-radius: 16px;
  &:hover:before {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: -1;
    border-radius: inherit;
    background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  }
  input {
    font-weight: bold;
  }
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`
const Container = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const WrapBox = styled(Box)`
  .swap-currency-input-text {
    border-bottom: 1px solid #fff;
  }
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  hasButton?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  hasButton = false,
}: CurrencyInputPanelProps) {
  const { account, library, chainId } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const token = pair ? pair.liquidityToken : currency instanceof Token ? currency : null
  const tokenAddress = token ? isAddress(token.address) : null

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <WrapBox position="relative" id={id}>
      {account && (
        <Flex justifyContent="space-between" marginBottom="6px">
          <Text color="textSubtle" fontSize="14px">
            {label}
          </Text>
          <AvaiableLayout>
            <Text
              onClick={onMax}
              color="#fff"
              fontSize="14px"
              style={{ display: 'inline', cursor: 'pointer' }}
              className={`${id}-text`}
            >
              {!hideBalance && !!currency
                ? t('Available: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                : ' -'}
            </Text>
            {hasButton && <MaxButton onClick={onMax}>{t('MAX')}</MaxButton>}
          </AvaiableLayout>
        </Flex>
      )}
      <Flex mb="6px" alignItems="center" justifyContent="space-between">
        <Flex>
          <CurrencySelectButton
            className="open-currency-select-button"
            selected={!!currency}
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
            accounted={!!account}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" bold style={{ margin: '0 20px 0 10px' }}>
                  {pair?.token0?.getSymbol(chainId)}:{pair?.token1?.getSymbol(chainId)}
                </Text>
              ) : (
                <Text id="pair" bold style={{ margin: '0 20px 0 10px' }} fontSize="16px">
                  {(currency && currency?.getSymbol(chainId) && currency?.getSymbol(chainId).length > 20
                    ? `${currency?.getSymbol(chainId).slice(0, 4)}...${currency
                        ?.getSymbol(chainId)
                        .slice(currency?.getSymbol(chainId).length - 5, currency?.getSymbol(chainId).length)}`
                    : currency?.getSymbol(chainId)) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
          {/* {token && tokenAddress ? (
            <Flex style={{ gap: '4px' }} alignItems="center">
              <CopyButton
                width="16px"
                buttonColor="textSubtle"
                text={tokenAddress}
                tooltipMessage={t('Token address copied')}
                tooltipTop={-20}
                tooltipRight={40}
                tooltipFontSize={12}
              />
              {library?.provider?.isMetaMask && (
                <MetamaskIcon
                  style={{ cursor: 'pointer' }}
                  width="16px"
                  onClick={() => registerToken(tokenAddress, token.getSymbol(chainId), token.decimals)}
                />
              )}
            </Flex>
          ) : null} */}
        </Flex>
      </Flex>
      <InputPanel>
        <Container as="label">
          <LabelRow>
            <NumericalInput
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </LabelRow>
          {/* <InputRow selected={disableCurrencySelect}>
            {account && currency && showMaxButton && label !== 'To' && (
              <Button onClick={onMax} scale="xs" variant="secondary">
                {t('Max').toLocaleUpperCase(locale)}
              </Button>
            )}
          </InputRow> */}
        </Container>
      </InputPanel>
    </WrapBox>
  )
}
