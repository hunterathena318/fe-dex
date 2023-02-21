import { Card, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { useAllPoolData, usePoolDatas } from 'state/info/hooks'
import { useWatchlistPools } from 'state/user/hooks'
import styled from 'styled-components'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'

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

const PoolsOverview: React.FC = () => {
  const { t } = useTranslation()

  const { chainId } = useActiveWeb3React()
  // get all the pool datas that exist
  const allPoolData = useAllPoolData(chainId)
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter((pool) => pool)
  }, [allPoolData])

  const [savedPools] = useWatchlistPools()
  const watchlistPools = usePoolDatas(savedPools)

  return (
    <Page>
      <HeadingText>{t('Your Watchlist')}</HeadingText>
      {watchlistPools.length > 0 ? (
        <Card>
          <PoolTable poolDatas={watchlistPools} />
        </Card>
      ) : (
        <BoxCard>
          <Card>
            <Text px="24px" color="grey" py="16px">
              {t('Saved pools will appear here')}
            </Text>{' '}
          </Card>
        </BoxCard>
      )}
      <HeadingText>{t('All Pools')}</HeadingText>
      <PoolTable poolDatas={poolDatas} />
    </Page>
  )
}

export default PoolsOverview
