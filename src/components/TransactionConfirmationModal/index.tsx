import { useCallback } from 'react'
import { ChainId, Currency, Token } from '@techchainswapfinance/sdk'
import styled from 'styled-components'
import {
  Button,
  Text,
  ErrorIcon,
  ArrowUpIcon,
  MetamaskIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
} from '@pancakeswap/uikit'
import { registerToken } from 'utils/wallet'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { RowFixed } from '../Layout/Row'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getEtherscanLink } from '../../utils'

const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 0px 0 24px 0;
`
const TextGradient = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  font-family: Poppins;
  text-align: center;
  background: linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const GradientTextErrors = styled(Text)`
  background: ${({ theme }) => theme.colors.bgRedOrangeButton};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <Spinner />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="20px">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <TextGradient>{pendingText}</TextGradient>
        </AutoColumn>
        <Text small color="textSubtle" textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </Text>
      </AutoColumn>
    </Wrapper>
  )
}

export function TransactionSubmittedContent({
  pendingText,
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  pendingText?: string
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { library } = useActiveWeb3React()

  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  const GoToScan = () => {
    if (typeof window !== undefined) {
      window.open(getEtherscanLink(hash, 'transaction', chainId), '_blank').focus()
    }
  }
  return (
    <Wrapper>
      <Section style={{ paddingTop: '0' }}>
        <ConfirmedIcon>
          <ArrowUpIcon strokeWidth={0.5} width="90px" color="primary" />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <Text fontSize="16px" fontFamily="Poppins">
            {t('Transaction Submitted')}
          </Text>
          <Text fontSize="16px" color="grey" fontFamily="Poppins">
            {pendingText}
          </Text>
          {/* {chainId && hash && (
              <Link external small href={getEtherscanLink(hash, 'transaction', chainId)}>
                {t('View on Explorer')}
              </Link>
            )} */}
          {/* {currencyToAdd && library?.provider?.isMetaMask && (
              <Button
                variant="tertiary"
                mt="12px"
                width="fit-content"
                onClick={() => registerToken(token.address, token?.getSymbol(chainId), token.decimals)}
              >
                <RowFixed>
                  {t('Add %asset% to Metamask', { asset: currencyToAdd?.getSymbol(chainId) })}
                  <MetamaskIcon width="16px" ml="6px" />
                </RowFixed>
              </Button>
            )} */}

          {chainId && hash && (
            <Button
              external
              onClick={GoToScan}
              mt="20px"
              width="100%"
              style={{ fontSize: '16px', fontFamily: 'Poppins' }}
              variant="linear"
            >
              {t('View on Explorer')}
            </Button>
          )}
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <ErrorIcon width="64px" marginBottom={20} />
        <GradientTextErrors color="failure" style={{ textAlign: 'center', width: '85%' }}>
          {message}
        </GradientTextErrors>
      </AutoColumn>

      <Flex justifyContent="center" pt="24px">
        <Button onClick={onDismiss} variant="linear">
          {t('Dismiss')}
        </Button>
      </Flex>
    </Wrapper>
  )
}

interface ConfirmationModalProps {
  title?: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<InjectedModalProps & ConfirmationModalProps> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <TransactionSubmitted>
      <Modal title={title} headerBackground="gradients.cardHeader" onDismiss={handleDismiss}>
        {attemptingTxn ? (
          <ConfirmationPendingContent pendingText={pendingText} />
        ) : hash ? (
          <TransactionSubmittedContent
            pendingText={pendingText}
            chainId={chainId}
            hash={hash}
            onDismiss={handleDismiss}
            currencyToAdd={currencyToAdd}
          />
        ) : (
          content()
        )}
      </Modal>
    </TransactionSubmitted>
  )
}

export default TransactionConfirmationModal

const TransactionSubmitted = styled.div`
  z-index: ${({ theme }) => theme.zIndices.modal};
  & div {
    border: none;
  }
`
