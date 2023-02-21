import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import poolsConfig from 'config/constants/pools'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getIfoPoolAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressV2,
  getBunnySpecialXmasAddress,
  getGemuniTokenAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import tradingCompetitionV2Abi from 'config/abi/tradingCompetitionV2.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import ifoPoolAbi from 'config/abi/ifoPool.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import bunnySpecialXmasAbi from 'config/abi/bunnySpecialXmas.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'

// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  IfoV1,
  IfoV2,
  IfoPool,
  Erc20,
  Erc721,
  Cake,
  BunnyFactory,
  PancakeRabbits,
  PancakeProfile,
  LotteryV2,
  Masterchef,
  SousChef,
  SousChefV2,
  BunnySpecial,
  LpToken,
  ClaimRefund,
  TradingCompetition,
  TradingCompetitionV2,
  EasterNft,
  CakeVault,
  Multicall,
  BunnySpecialCakeVault,
  BunnySpecialPrediction,
  BunnySpecialLottery,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  PointCenterIfo,
} from 'config/abi/types'
import { getContract } from './getContract'

// const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
//   const signerOrProvider = signer ?? simpleRpcProvider
//   return new Contract(address, abi, signerOrProvider)
// }

export const getBep20Contract = (address: string, chainId: number, signer?: Signer | Provider) => {
  return getContract(bep20Abi, address, chainId, signer) as Erc20
}
export const getErc721Contract = (address: string, chainId: number, signer?: Signer | Provider) => {
  return getContract(erc721Abi, address, chainId, signer) as Erc721
}
export const getLpContract = (address: string, chainId: number, signer?: Signer | Provider) => {
  return getContract(lpTokenAbi, address, chainId, signer) as LpToken
}
export const getIfoV1Contract = (address: string, chainId: number, signer?: Signer | Provider) => {
  return getContract(ifoV1Abi, address, chainId, signer) as IfoV1
}
export const getIfoV2Contract = (address: string, chainId: number, signer?: Signer | Provider) => {
  return getContract(ifoV2Abi, address, chainId, signer) as IfoV2
}
export const getSouschefContract = (id: number, chainId: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), chainId, signer) as SousChef
}
export const getSouschefV2Contract = (id: number, chainId: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), chainId, signer) as SousChefV2
}

export const getPointCenterIfoContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(chainId), chainId, signer) as PointCenterIfo
}
export const getCakeContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(cakeAbi, tokens.cake.address, chainId, signer) as Cake
}
export const getGemuniContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(cakeAbi, getGemuniTokenAddress(chainId), chainId, signer) as Cake
}
export const getProfileContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(chainId), chainId, signer) as PancakeProfile
}
export const getPancakeRabbitContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(chainId), chainId, signer) as PancakeRabbits
}
export const getBunnyFactoryContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(chainId), chainId, signer) as BunnyFactory
}
export const getBunnySpecialContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(chainId), chainId, signer) as BunnySpecial
}
export const getLotteryV2Contract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(chainId), chainId, signer) as LotteryV2
}
export const getMasterchefContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(masterChef, getMasterChefAddress(chainId), chainId, signer) as Masterchef
}
export const getClaimRefundContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(chainId), chainId, signer) as ClaimRefund
}
export const getTradingCompetitionContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(
    tradingCompetitionAbi,
    getTradingCompetitionAddress(chainId),
    chainId,
    signer,
  ) as TradingCompetition
}

export const getTradingCompetitionContractV2 = (chainId: number, signer?: Signer | Provider) => {
  return getContract(
    tradingCompetitionV2Abi,
    getTradingCompetitionAddressV2(chainId),
    chainId,
    signer,
  ) as TradingCompetitionV2
}
export const getEasterNftContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(chainId), chainId, signer) as EasterNft
}
export const getCakeVaultContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(cakeVaultAbi, getCakeVaultAddress(), chainId, signer) as CakeVault
}
export const getIfoPoolContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(ifoPoolAbi, getIfoPoolAddress(), chainId, signer) as IfoPool
}

export const getPredictionsContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(), chainId, signer) as unknown as Predictions
}

export const getChainlinkOracleContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), chainId, signer) as ChainlinkOracle
}
export const getMulticallContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(chainId), chainId, signer) as Multicall
}
export const getBunnySpecialCakeVaultContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(
    bunnySpecialCakeVaultAbi,
    getBunnySpecialCakeVaultAddress(),
    chainId,
    signer,
  ) as BunnySpecialCakeVault
}
export const getBunnySpecialPredictionContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(
    bunnySpecialPredictionAbi,
    getBunnySpecialPredictionAddress(),
    chainId,
    signer,
  ) as BunnySpecialPrediction
}
export const getBunnySpecialLotteryContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), chainId, signer) as BunnySpecialLottery
}
export const getBunnySpecialXmasContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bunnySpecialXmasAbi, getBunnySpecialXmasAddress(), chainId, signer)
}
export const getFarmAuctionContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), chainId, signer) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(), chainId, signer) as AnniversaryAchievement
}
export const getNftMarketContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(), chainId, signer) as NftMarket
}
export const getNftSaleContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(nftSaleAbi, getNftSaleAddress(), chainId, signer) as NftSale
}
export const getPancakeSquadContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(), chainId, signer) as PancakeSquad
}
export const getErc721CollectionContract = (chainId: number, signer?: Signer | Provider, address?: string) => {
  return getContract(erc721CollectionAbi, address, chainId, signer) as Erc721collection
}
