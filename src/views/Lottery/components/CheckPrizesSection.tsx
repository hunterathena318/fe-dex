import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Heading, Flex, useModal, AutoRenewIcon } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { FetchStatus, LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { useGetUserLotteriesGraphData, useLottery } from 'state/lottery/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ClaimPrizesModal from './ClaimPrizesModal'
import useGetUnclaimedRewards from '../hooks/useGetUnclaimedRewards'

const TicketImage = styled.img`
  height: 60px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100px;
  }
`

const TornTicketImage = styled.img`
  height: 54px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 84px;
  }
`
const BoxDoubleCoin = styled.div`
  width: 100%;
  height: 440px;
  background-image: url('/images/lottery/sell.webp');
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    height: auto;
  }
`
const HeadingConnect = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  line-height: 110%;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 4px 20px #8668df;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 110%;
  }
`
const BoxBorderConnect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 406px;
  margin-top: 36px;
  background: rgba(43, 27, 78, 0.4);
  border: 1px solid rgba(129, 75, 246, 0.2);
  box-sizing: border-box;
  backdrop-filter: blur(64px);
  border-radius: 20px;
  padding: 50px 32px;
  @media only screen and (max-width: 768px) {
    min-width: 343px;
  }
  button {
    background: ${({ theme }) => theme.colors.bgPrimaryButton};
    border-radius: 100px;
  }
  .btnCheck {
    background: linear-gradient(90deg, #da4133 -0.15%, #f27053 96.99%);
    border-radius: 100px;
  }
`

const CheckPrizesSection = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    isTransitioning,
    currentRound: { status },
  } = useLottery()
  const { fetchAllRewards, unclaimedRewards, fetchStatus } = useGetUnclaimedRewards()
  const userLotteryData = useGetUserLotteriesGraphData()
  const [hasCheckedForRewards, setHasCheckedForRewards] = useState(false)
  const [hasRewardsToClaim, setHasRewardsToClaim] = useState(false)
  const [onPresentClaimModal] = useModal(<ClaimPrizesModal roundsToClaim={unclaimedRewards} />, false)
  const isFetchingRewards = fetchStatus === FetchStatus.Fetching
  const lotteryIsNotClaimable = status === LotteryStatus.CLOSE
  const isCheckNowDisabled = !userLotteryData.account || lotteryIsNotClaimable

  useEffect(() => {
    if (fetchStatus === FetchStatus.Fetched) {
      // Manage showing unclaimed rewards modal once per page load / once per lottery state change
      if (unclaimedRewards.length > 0 && !hasCheckedForRewards) {
        setHasRewardsToClaim(true)
        setHasCheckedForRewards(true)
        onPresentClaimModal()
      }

      if (unclaimedRewards.length === 0 && !hasCheckedForRewards) {
        setHasRewardsToClaim(false)
        setHasCheckedForRewards(true)
      }
    }
  }, [unclaimedRewards, hasCheckedForRewards, fetchStatus, onPresentClaimModal])

  useEffect(() => {
    // Clear local state on account change, or when lottery isTransitioning state changes
    setHasRewardsToClaim(false)
    setHasCheckedForRewards(false)
  }, [account, isTransitioning])

  const getBody = () => {
    if (!account) {
      return (
        <Flex alignItems="center" justifyContent="center" style={{ width: '100%' }}>
          <BoxDoubleCoin>
            <Flex mx={['4px', null, '16px']} flexDirection="column" alignItems="center">
              <HeadingConnect>{t('Connect your wallet')}</HeadingConnect>
              <HeadingConnect>{t("to check if you've won!")}</HeadingConnect>
              <BoxBorderConnect>
                <ConnectWalletButton width="100%" style={{ fontSize: '16px', fontFamily: 'Inter' }} />
              </BoxBorderConnect>
            </Flex>
          </BoxDoubleCoin>
        </Flex>
      )
    }
    if (hasCheckedForRewards && !hasRewardsToClaim) {
      return (
        <BoxDoubleCoin>
          <Flex alignItems="center" justifyContent="center" position="relative">
            <Flex
              mx={['4px', null, '16px']}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                background: 'rgba(43, 27, 78, 0.4)',
                borderRadius: '20px',
                border: '1px solid #814BF633',
                width: '406px',
                height: '158px',
              }}
            >
              <Heading style={{ fontSize: '24px', color: '#777E90' }}>
                {t('No prizes to collect')}... <br />
                {t('Better luck next time!')}
              </Heading>
            </Flex>
          </Flex>
        </BoxDoubleCoin>
      )
    }
    if (hasCheckedForRewards && hasRewardsToClaim) {
      return (
        <BoxDoubleCoin>
          <Flex alignItems="center" justifyContent="center">
            <Flex mx={['4px', null, '16px']} flexDirection="column">
              <Heading textAlign="center" color="#F4EEFF">
                {t('Congratulations!')}
              </Heading>
              <Heading textAlign="center" color="#F4EEFF">
                {t('Why not play again')}
              </Heading>
            </Flex>
          </Flex>
        </BoxDoubleCoin>
      )
    }
    const checkNowText = () => {
      if (lotteryIsNotClaimable) {
        return `${t('Calculating rewards')}...`
      }
      if (isFetchingRewards) {
        return t('Checking')
      }
      return t('Check Now')
    }
    return (
      <BoxDoubleCoin>
        <Flex alignItems="center" justifyContent="center">
          <Flex mx={['4px', null, '16px']} flexDirection="column" alignItems="center">
            <HeadingConnect>{t('Are you a winner?')}</HeadingConnect>
            <BoxBorderConnect>
              <Button
                disabled={isCheckNowDisabled}
                onClick={fetchAllRewards}
                isLoading={isFetchingRewards}
                endIcon={isFetchingRewards ? <AutoRenewIcon color="currentColor" spin /> : null}
                width="100%"
                className="btnCheck"
                style={{ fontSize: '16px', fontFamily: 'Inter' }}
              >
                {checkNowText()}
              </Button>
            </BoxBorderConnect>
          </Flex>
        </Flex>
      </BoxDoubleCoin>
    )
  }

  return <Flex style={{ width: '100%' }}>{getBody()}</Flex>
}

export default CheckPrizesSection
