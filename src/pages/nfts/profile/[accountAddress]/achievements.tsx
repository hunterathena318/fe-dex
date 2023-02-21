import { useRouter } from 'next/router'
import { useAchievementsForAddress, useProfileForAddress } from 'state/profile/hooks'
import { NftProfileLayout } from 'views/Nft/market/Profile'
import Achievements from 'views/Nft/market/Profile/components/Achievements'
import NotFound from 'views/NotFound'

const NftProfileAchievementsPage = () => {
  const accountAddress = useRouter().query.accountAddress as string
  const { profile } = useProfileForAddress(accountAddress)
  const { achievements, isFetching: isAchievementFetching, refresh } = useAchievementsForAddress(accountAddress)
  return <NotFound />

  return (
    <Achievements
      achievements={achievements}
      isLoading={isAchievementFetching}
      points={profile?.points}
      onSuccess={refresh}
    />
  )
}

NftProfileAchievementsPage.Layout = NftProfileLayout

export default NftProfileAchievementsPage
