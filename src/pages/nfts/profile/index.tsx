import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import NotFound from 'views/NotFound'

const ProfilePage = () => {
  const { account } = useWeb3React()
  const router = useRouter()
  return <NotFound />

  useEffect(() => {
    if (account) {
      router.push(`${nftsBaseUrl}/profile/${account.toLowerCase()}`)
    } else {
      router.push(nftsBaseUrl)
    }
  }, [account, router])

  return null
}

export default ProfilePage
