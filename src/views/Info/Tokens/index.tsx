import { Card, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useMemo } from 'react'
import { useAllTokenData, useTokenDatas } from 'state/info/hooks'
import { useWatchlistTokens } from 'state/user/hooks'
import styled from 'styled-components'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import TopTokenMovers from 'views/Info/components/TopTokenMovers'

const HeadingText = styled.h1`
  font-weight: 700;
  font-size: 25px;
  line-height: 27px;
  color: #ffffff;
  text-shadow: 0px 4px 20px #8668df;
  margin-top: 40px;
  margin-bottom: 33px;
`
const BoxCard = styled.div`
  div {
    border-radius: 12px;
    min-height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const TokensOverview: React.FC = () => {
  const { t } = useTranslation()

  const allTokens = useAllTokenData()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token)
  }, [allTokens])

  const [savedTokens] = useWatchlistTokens()
  const watchListTokens = useTokenDatas(savedTokens)

  return (
    <Page>
      <HeadingText>{t('Your Watchlist')}</HeadingText>
      {savedTokens.length > 0 ? (
        <TokenTable tokenDatas={watchListTokens} />
      ) : (
        <BoxCard>
          <Card>
            <Text py="16px" px="24px" color="grey" textAlign="center">
              {t('Saved tokens will appear here')}
            </Text>
          </Card>
        </BoxCard>
      )}
      <TopTokenMovers />
      <HeadingText>{t('All Tokens')}</HeadingText>
      <TokenTable tokenDatas={formattedTokens} />
    </Page>
  )
}

export default TokensOverview
