import { useMemo } from 'react'
import styled from 'styled-components'
import { Pair } from '@techchainswapfinance/sdk'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { isMobile } from 'react-device-detect'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.tertiary};
  border: ${({ theme }) => theme.colors.borderBtn};
  margin: 12px;
  padding: 16px;
  border-radius: 16px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0 30px;
  }
`
const CardFooterLayout = styled(CardFooter)`
  margin: 24px 12px 32px 12px;
  padding: 0;
  text-align: center;
  padding-top: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.backgroundTotal};
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 24px;
  }
`
export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="textSubtle" textAlign="center" fontSize="14px">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <Text color="textSubtle" textAlign="center" fontSize="14px">
        {t('No liquidity found.')}
      </Text>
    )
  }

  return (
    <Page style={{ paddingTop: '150px' }}>
      <AppBody background="#110E27">
        <AppHeader title={t('Liquidity')} subtitle={t('Remove liquidity to receive tokens back')} />
        <Body>
          {renderBody()}
          {account && !v2IsLoading && (
            <Flex flexDirection="column" alignItems="center" mt="24px">
              <Text color="textSubtle" mb="8px" fontSize="14px">
                {t("Don't see a pool you joined?")}
              </Text>
              <Link href="/find" passHref>
                <Button
                  id="import-pool-link"
                  variant="linear"
                  scale="sm"
                  as="a"
                  style={{ fontSize: '16px', borderRadius: '16px' }}
                >
                  {t('Find other LP tokens')}
                </Button>
              </Link>
            </Flex>
          )}
        </Body>
        <CardFooterLayout>
          <Link href="/add" passHref>
            <Button id="join-pool-button" width="100%" variant="linear" style={{ fontSize: '16px' }}>
              {t('Add Liquidity')}
            </Button>
          </Link>
        </CardFooterLayout>
      </AppBody>
    </Page>
  )
}
