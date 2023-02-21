import BigNumber from 'bignumber.js'
import { Flex, Skeleton, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'
import { getPriceGemuniBusd } from 'state/lottery/getLotteriesData'
import { useState, useEffect } from 'react'

interface RewardBracketDetailProps {
  cakeAmount: BigNumber
  rewardBracket?: number
  numberWinners?: string
  isBurn?: boolean
  isHistoricRound?: boolean
  isLoading?: boolean
}

const CustomText = styled(Text)`
  background: linear-gradient(90deg, #da4133 -0.15%, #f27053 96.99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
const RewardText = styled(Text)`
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`
const WrapBalance = styled.div`
  div {
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    div {
      font-size: 22px;
    }
  }
`

const RewardBracketDetail: React.FC<RewardBracketDetailProps> = ({
  rewardBracket,
  cakeAmount,
  numberWinners,
  isHistoricRound,
  isBurn,
  isLoading,
}) => {
  const { t } = useTranslation()
  // const cakePriceBusd = usePriceCakeBusd()
  const [cakePriceBusd, setCakePriceBusd] = useState<BigNumber>()
  
  const getRewardText = () => {
    const numberMatch = rewardBracket + 1
    if (isBurn) {
      return t('Burn')
    }
    if (rewardBracket === 5) {
      return t('Match all %numberMatch%', { numberMatch })
    }
    return t('Match first %numberMatch%', { numberMatch })
  }

  useEffect(() => {
    const getPrice = async () => {
      const price = await getPriceGemuniBusd()
      setCakePriceBusd(price)
    }
    getPrice()
  }, [])
  return (
    <Flex flexDirection="column">
        {isLoading ? (
          <Skeleton mb="4px" mt="8px" height={16} width={80} />
        ) : (
          <>
            {isBurn ? (
              <CustomText bold fontFamily="Inter">
                {getRewardText()}
              </CustomText>
            ) : (
              <RewardText bold color="sencondaryLottery" fontFamily="Inter">
                {getRewardText()}
              </RewardText>
            )}
          </>
        )}
      <>
        {isLoading || cakeAmount.isNaN() ? (
          <Skeleton my="4px" mr="10px" height={20} width={110} />
        ) : (
          <WrapBalance>
            <Balance
              fontSize="24px"
              bold
              unit=" GENI"
              value={getBalanceNumber(cakeAmount)}
              decimals={0}
              fontFamily="Inter"
            />
          </WrapBalance>
        )}
        {isLoading || cakeAmount.times(cakePriceBusd).isNaN() ? (
          <>
            <Skeleton mt="4px" mb="16px" height={12} width={70} />
          </>
        ) : (
          <Balance
            fontSize="14px"
            color="textSubtle"
            prefix="~$"
            value={getBalanceNumber(cakeAmount.times(cakePriceBusd))}
            decimals={0}
          />
        )}
        {isHistoricRound && cakeAmount && (
          <>
            {numberWinners !== '0' && (
              <Text fontSize="12px" color="textSubtle">
                {getFullDisplayBalance(cakeAmount.div(parseInt(numberWinners, 10)), 18, 2)} GENI {t('each')}
              </Text>
            )}
            <Text fontSize="12px" color="textSubtle">
              {numberWinners} {t('Winning Tickets')}
            </Text>
          </>
        )}
      </>
    </Flex>
  )
}

export default RewardBracketDetail
