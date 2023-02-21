import { TOKEN_BLACKLIST } from 'config/constants/info'
import { gql } from 'graphql-request'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useEffect, useState } from 'react'
import { infoClient } from 'utils/graphql'
import { getDeltaTimestamps } from 'views/Info/utils/infoQueryHelpers'

interface TopPoolsResponse {
  pairDayDatas: {
    id: string
  }[]
}

/**
 * Initial pools to display on the home page
 */
const fetchTopPools = async (timestamp24hAgo: number, chainId: number): Promise<string[]> => {
  try {
    const query = gql`
      query topPools($blacklist: [String!], $timestamp24hAgo: Int) {
        pairDayDatas(
          first: 30
          where: { dailyTxns_gt: 300, token0_not_in: $blacklist, token1_not_in: $blacklist, date_gt: $timestamp24hAgo }
          orderBy: dailyVolumeUSD
          orderDirection: desc
        ) {
          id
        }
      }
    `
    const data = await infoClient(chainId).request<TopPoolsResponse>(query, {
      blacklist: TOKEN_BLACKLIST,
      timestamp24hAgo,
    })
    // pairDayDatas id has compound id "0xPOOLADDRESS-NUMBERS", extracting pool address with .split('-')
    return data.pairDayDatas.map((p) => p.id.split('-')[0])
  } catch (error) {
    console.error('Failed to fetch top pools', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useTopPoolAddresses = (): string[] => {
  const [topPoolAddresses, setTopPoolAddresses] = useState([])
  const { chainId } = useActiveWeb3React()
  const [timestamp24hAgo] = getDeltaTimestamps(chainId)

  const fetch = useCallback(async () => {
    const addresses = await fetchTopPools(timestamp24hAgo, chainId)
    setTopPoolAddresses(addresses)
  }, [chainId, timestamp24hAgo])

  useEffect(() => {
    if (topPoolAddresses.length === 0) {
      fetch()
    }
  }, [topPoolAddresses, timestamp24hAgo, fetch])

  useEffect(() => {
    fetch()
  }, [chainId, fetch])

  return topPoolAddresses
}

export default useTopPoolAddresses
