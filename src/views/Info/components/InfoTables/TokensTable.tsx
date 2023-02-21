import { useState, useMemo, useCallback, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, ArrowBackIcon, ArrowForwardIcon } from '@pancakeswap/uikit'
import { TokenData } from 'state/info/types'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from './shared'

/**
 *  Columns on different layouts
 *  6 = | # | Name | Price | Price Change | Volume 24H | TVL |
 *  5 = | # | Name | Price |              | Volume 24H | TVL |
 *  4 = | # | Name | Price |              | Volume 24H |     |
 *  2 = |   | Name |       |              | Volume 24H |     |
 *  On smallest screen Name is reduced to just symbol
 */
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  padding: 0 24px;

  grid-template-columns: 20px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 2fr repeat(3, 1fr);
    & :nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 20px 2fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr 1fr;
    > *:first-child {
      display: none;
    }
    > *:nth-child(3) {
      display: none;
    }
  }
`

const LinkWrapper = styled(NextLinkFromReactRouter)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 16px;
    height: 16px;
  }
`
const BoxIconSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 5px;
`

const AlignText = styled(Text)`
  text-align: center;
`

const TableLoader: React.FC = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<{ tokenData: TokenData; index: number }> = ({ tokenData, index }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  return (
    <LinkWrapper to={`/info/token/${tokenData.address}`}>
      <ResponsiveGrid>
        <Flex>
          <AlignText>{index + 1}</AlignText>
        </Flex>
        <Flex alignItems="center" ml="15px">
          <ResponsiveLogo address={tokenData.address} />
          {(isXs || isSm) && <AlignText ml="8px">{tokenData.symbol}</AlignText>}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              <AlignText bold>{tokenData.name}</AlignText>
              <AlignText ml="8px" bold>
                ({tokenData.symbol})
              </AlignText>
            </Flex>
          )}
        </Flex>
        <AlignText fontWeight={400}>{`$ ${formatAmount(tokenData.priceUSD, { notation: 'standard' })}`}</AlignText>
        <AlignText fontWeight={400}>
          <Percent value={tokenData.priceUSDChange} fontWeight={400} />
        </AlignText>
        <AlignText fontWeight={400}>{`$ ${formatAmount(tokenData.volumeUSD)}`}</AlignText>
        <AlignText fontWeight={400}>{`$ ${formatAmount(tokenData.liquidityUSD)}`}</AlignText>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

const SORT_FIELD = {
  name: 'name',
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  priceUSD: 'priceUSD',
  priceUSDChange: 'priceUSDChange',
  priceUSDChangeWeek: 'priceUSDChangeWeek',
}

const MAX_ITEMS = 10

const TokenTable: React.FC<{
  tokenDatas: TokenData[] | undefined
  maxItems?: number
}> = ({ tokenDatas, maxItems = MAX_ITEMS }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (tokenDatas) {
      if (tokenDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(tokenDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, tokenDatas])

  const sortedTokens = useMemo(() => {
    return tokenDatas
      ? tokenDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof TokenData] > b[sortField as keyof TokenData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [tokenDatas, maxItems, page, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )
  const IconSort = (dow: boolean) => {
    return (
      <>
        {dow ? (
          <BoxIconSort>
            <img src="/icons/up.svg" width="10px" alt="icon sort" height="10px" />
            <img src="/icons/down_blur.svg" width="10px" alt="icon sort" height="10px" style={{ opacity: '0.3' }} />
          </BoxIconSort>
        ) : (
          <BoxIconSort>
            <img src="/icons/up_blur.svg" alt="icon sort" width="10px" height="10px" style={{ opacity: '0.3' }} />
            <img src="/icons/down.svg" alt="icon sort" width="10px" height="10px" />
          </BoxIconSort>
        )}
      </>
    )
  }

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? IconSort(true) : IconSort(false)
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  if (!tokenDatas) {
    return <Skeleton />
  }

  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="#777E90" fontSize="16px" fontFamily="Inter">
          #
        </Text>
        <ClickableColumnHeader
          color="#777E90"
          fontSize="16px"
          mr="20rem"
          onClick={() => handleSort(SORT_FIELD.name)}
          textTransform="uppercase"
        >
          {t('Name')} {arrow(SORT_FIELD.name)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="#777E90"
          fontSize="16px"
          onClick={() => handleSort(SORT_FIELD.priceUSD)}
          textTransform="uppercase"
        >
          {t('Price')} {arrow(SORT_FIELD.priceUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="#777E90"
          fontSize="16px"
          onClick={() => handleSort(SORT_FIELD.priceUSDChange)}
          textTransform="uppercase"
        >
          {t('Price Change')} {arrow(SORT_FIELD.priceUSDChange)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="#777E90"
          fontSize="16px"
          onClick={() => handleSort(SORT_FIELD.volumeUSD)}
          textTransform="uppercase"
        >
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="#777E90"
          fontSize="16px"
          onClick={() => handleSort(SORT_FIELD.liquidityUSD)}
          textTransform="uppercase"
        >
          {t('Liquidity')} {arrow(SORT_FIELD.liquidityUSD)}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      <Break />
      {sortedTokens.length > 0 ? (
        <>
          {sortedTokens.map((data, i) => {
            if (data) {
              return (
                <Fragment key={data.address}>
                  <DataRow index={(page - 1) * MAX_ITEMS + i} tokenData={data} />
                  <Break />
                </Fragment>
              )
            }
            return null
          })}
          <PageButtons>
            <Arrow
              onClick={() => {
                setPage(page === 1 ? page : page - 1)
              }}
            >
              <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
            </Arrow>
            <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
            <Arrow
              onClick={() => {
                setPage(page === maxPage ? page : page + 1)
              }}
            >
              <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
            </Arrow>
          </PageButtons>
        </>
      ) : (
        <>
          <TableLoader />
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default TokenTable
