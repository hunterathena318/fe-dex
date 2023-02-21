import { NftProfileLayout } from 'views/Nft/market/Profile'
import ActivityHistory from 'views/Nft/market/Profile/components/ActivityHistory'
import SubMenu from 'views/Nft/market/Profile/components/SubMenu'
import NotFound from 'views/NotFound'

const NftProfileActivityPage = () => {
  return <NotFound />

  return (
    <>
      <SubMenu />
      <ActivityHistory />
    </>
  )
}

NftProfileActivityPage.Layout = NftProfileLayout

export default NftProfileActivityPage
