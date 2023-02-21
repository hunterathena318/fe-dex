import { useWeb3React } from '@web3-react/core'
import { CHAIN_ID } from 'config/constants/chains'
import { useRouter } from 'next/router'
import { env } from 'process'
import { useEffect } from 'react'
import { PoolUpdater, ProtocolUpdater, TokenUpdater } from 'state/info/updaters'
import styled from 'styled-components'
import InfoNav from './components/InfoNav'

const InforPage = styled.div`
  min-height: calc(100vh - 64px);
  background-image: url('/images/ifos/background_info.webp');
  background-size: cover;
  background-repeat: no-repeat;
`

export const InfoPageLayout = ({ children }) => {
  const { chainId } = useWeb3React()
  const router = useRouter()

  const redirectDomain = (chainIdDomain: number) => {
    switch (chainIdDomain) {
      case CHAIN_ID.MATIC:
      case CHAIN_ID.MATIC_TESTNET:
        return router.push(process.env.NEXT_PUBLIC_INFO_DOMAIN_POLYGON) || null
      case CHAIN_ID.AVALANCHE:
        return router.push(process.env.NEXT_PUBLIC_INFO_DOMAIN_AVALANCHE) || null
      case CHAIN_ID.RINKEBY:
      case CHAIN_ID.MAINNET:
        return router.push(process.env.NEXT_PUBLIC_INFO_DOMAIN_ETHEREUM) || null
      default:
        return null
    }
  }

  useEffect(() => {
    redirectDomain(chainId)
  }, [chainId])

  return (
    <>
      {/* <ProtocolUpdater /> */}
      <PoolUpdater />
      <TokenUpdater />
      <InforPage>
        <InfoNav />
        {children}
      </InforPage>
    </>
  )
}
