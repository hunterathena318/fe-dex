import { ChainId } from '@techchainswapfinance/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { VaultKey } from 'state/types'

export const getAddress = (address: Address, chainId?: number): string => {
  const myChainId = chainId ?? Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  return address[myChainId] ? address[myChainId] : address[ChainId.BSC]
}

export const getMasterChefAddress = (chainId: number) => {
  return getAddress(addresses.masterChef, chainId)
}

export const getGemuniTokenAddress = (chainId: number) => {
  return getAddress(addresses.gemuniToken, chainId)
}

export const getMulticallAddress = (chainId: number) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getLotteryV2Address = (chainId: number) => {
  return getAddress(addresses.lotteryV2, chainId)
}
export const getPancakeProfileAddress = (chainId: number) => {
  return getAddress(addresses.pancakeProfile, chainId)
}
export const getPancakeRabbitsAddress = (chainId: number) => {
  return getAddress(addresses.pancakeRabbits, chainId)
}
export const getBunnyFactoryAddress = (chainId: number) => {
  return getAddress(addresses.bunnyFactory, chainId)
}
export const getClaimRefundAddress = (chainId: number) => {
  return getAddress(addresses.claimRefund, chainId)
}
export const getPointCenterIfoAddress = (chainId: number) => {
  return getAddress(addresses.pointCenterIfo, chainId)
}
export const getBunnySpecialAddress = (chainId: number) => {
  return getAddress(addresses.bunnySpecial, chainId)
}
export const getTradingCompetitionAddress = (chainId: number) => {
  return getAddress(addresses.tradingCompetition, chainId)
}
export const getTradingCompetitionAddressV2 = (chainId: number) => {
  return getAddress(addresses.tradingCompetitionV2, chainId)
}
export const getEasterNftAddress = (chainId: number) => {
  return getAddress(addresses.easterNft, chainId)
}

export const getVaultPoolAddress = (vaultKey: VaultKey) => {
  if (!vaultKey) {
    return null
  }
  return getAddress(addresses[vaultKey])
}

export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}
export const getIfoPoolAddress = () => {
  return getAddress(addresses.ifoPool)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getBunnySpecialCakeVaultAddress = () => {
  return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return getAddress(addresses.bunnySpecialPrediction)
}
export const getBunnySpecialLotteryAddress = () => {
  return getAddress(addresses.bunnySpecialLottery)
}
export const getBunnySpecialXmasAddress = () => {
  return getAddress(addresses.bunnySpecialXmas)
}
export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return getAddress(addresses.AnniversaryAchievement)
}
export const getNftMarketAddress = () => {
  return getAddress(addresses.nftMarket)
}
export const getNftSaleAddress = () => {
  return getAddress(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return getAddress(addresses.pancakeSquad)
}
