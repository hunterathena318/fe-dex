import { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Skeleton, Heading, Box, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { LotteryRound, LotteryRoundGraphEntity } from 'state/types'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useGetLotteryGraphDataById } from 'state/lottery/hooks'
import { getGraphLotteries, getPriceGemuniBusd } from 'state/lottery/getLotteriesData'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import RewardBrackets from '../RewardBrackets'

const NextDrawWrapper = styled(Flex)`
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const PreviousRoundCardFooter: React.FC<{ lotteryNodeData: LotteryRound; lotteryId: string }> = ({
  lotteryNodeData,
  lotteryId,
}) => {
  const { t } = useTranslation()
  const [fetchedLotteryGraphData, setFetchedLotteryGraphData] = useState<LotteryRoundGraphEntity>()
  const [cakePriceBusd, setCakePriceBusd] = useState<BigNumber>()
  const lotteryGraphDataFromState = useGetLotteryGraphDataById(lotteryId)
  const { chainId } = useActiveWeb3React()
  // const cakePriceBusd = usePriceCakeBusd()
  // const cakePriceBusd = new BigNumber(getPriceGemuniBusd()).toNumber()

  useEffect(() => {
    const getPrice = async () => {
      const price = await getPriceGemuniBusd()
      setCakePriceBusd(price)
    }
    getPrice()
  }, [])

  useEffect(() => {
    const getGraphData = async () => {
      const fetchedGraphData = await getGraphLotteries(undefined, undefined, { id_in: [lotteryId] }, chainId)
      setFetchedLotteryGraphData(fetchedGraphData[0])
    }
    if (!lotteryGraphDataFromState) {
      getGraphData()
    }
  }, [chainId, lotteryGraphDataFromState, lotteryId])

  let prizeInBusd = new BigNumber(NaN)
  if (lotteryNodeData) {
    const { amountCollectedInCake } = lotteryNodeData
    prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  }

  const getTotalUsers = (): string => {
    if (!lotteryGraphDataFromState && fetchedLotteryGraphData) {
      return fetchedLotteryGraphData?.totalUsers?.toLocaleString()
    }

    if (lotteryGraphDataFromState) {
      return lotteryGraphDataFromState?.totalUsers?.toLocaleString()
    }

    return null
  }

  const getPrizeBalances = () => {
    return (
      <>
        {prizeInBusd.isNaN() ? (
          <Skeleton my="7px" height={40} width={200} />
        ) : (
          <Heading
            scale="xl"
            lineHeight="1.6" 
            color="secondary"
            width="168px"
            height="51px"
            fontSize="32px"
            fontWeight="700"
            style={{
              background: "linear-gradient(90deg, #06d3e6 -0.15%, #ffdb0d 96.99%)",
              backgroundClip: "text",
              WebkitTextFillColor:"transparent",
              WebkitBackgroundClip: "text",
              alignItems: "center",
              display: "flex",
              paddingTop: "5px"             
            }}
          >
            ~${formatNumber(getBalanceNumber(prizeInBusd), 0, 0)}
          </Heading>
        )}
        {prizeInBusd.isNaN() ? (
          <Skeleton my="2px" height={14} width={90} />
        ) : (
          <Balance
            fontSize="16px"
            color="textSubtle"
            unit=" GENI"
            value={getBalanceNumber(lotteryNodeData?.amountCollectedInCake)}
            decimals={0}
          />
        )}
      </>
    )
  }

  return (
    <NextDrawWrapper>
      <Flex mr="24px" flexDirection="column" justifyContent="space-between">
        <Box>
          <Heading>{t('Prize pot')}</Heading>
          {getPrizeBalances()}
        </Box>
        <Box mb="24px">
          <Flex>
            <Text fontSize="14px" display="inline">
              {t('Total players this round')}:<br />
              {lotteryNodeData && (lotteryGraphDataFromState || fetchedLotteryGraphData) ? (
                getTotalUsers()
              ) : (
                <Skeleton height={14} width={31} />
              )}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <RewardBrackets lotteryNodeData={lotteryNodeData} isHistoricRound />
    </NextDrawWrapper>
  )
}

export default PreviousRoundCardFooter
