import { useMemo, useEffect, useState } from 'react'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getCakeContract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getPancakeRabbitContract,
  getProfileContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  getTradingCompetitionContractV2,
  getEasterNftContract,
  getErc721Contract,
  getCakeVaultContract,
  getIfoPoolContract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getLotteryV2Contract,
  getBunnySpecialCakeVaultContract,
  getBunnySpecialPredictionContract,
  getFarmAuctionContract,
  getBunnySpecialLotteryContract,
  getAnniversaryAchievementContract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeSquadContract,
  getErc721CollectionContract,
  getBunnySpecialXmasContract,
  getGemuniContract,
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'
import { VaultKey } from 'state/types'
import {
  CakeVault,
  EnsPublicResolver,
  EnsRegistrar,
  Erc20,
  Erc20Bytes32,
  IfoPool,
  Multicall,
  Weth,
  Cake,
  Erc721collection,
} from 'config/abi/types'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '@techchainswapfinance/sdk'
import bep20Abi from 'config/abi/erc20.json'
import { Address } from 'config/constants/types'
import addresses from 'config/constants/contracts'
import IPancakePairABI from '../config/abi/IPancakePair.json'
import ENS_PUBLIC_RESOLVER_ABI from '../config/abi/ens-public-resolver.json'
import ENS_ABI from '../config/abi/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract, getProviderOrSigner } from '../utils'

import { IPancakePair } from '../config/abi/types/IPancakePair'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getIfoV1Contract(address, chainId, library.getSigner()), [address, library, chainId])
}

export const useIfoV2Contract = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getIfoV2Contract(address, chainId, library.getSigner()), [address, library, chainId])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  return useContract(address, bep20Abi, withSignerIfPossible) as Erc20
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getErc721Contract(address, chainId, library.getSigner()), [address, library, chainId])
}

export const useCake = (): { reader: Cake; signer: Cake } => {
  const { account, library, chainId } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getCakeContract(chainId),
      signer: getCakeContract(chainId, getProviderOrSigner(library, account)),
    }),
    [account, library, chainId],
  )
}
export const useGemuni = (): { reader: Cake; signer: Cake } => {
  const { account, library, chainId } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getGemuniContract(chainId),
      signer: getGemuniContract(chainId, getProviderOrSigner(library, account)),
    }),
    [account, library, chainId],
  )
}

export const useBunnyFactory = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnyFactoryContract(chainId, library.getSigner()), [library, chainId])
}

export const usePancakeRabbits = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPancakeRabbitContract(chainId, library.getSigner()), [library, chainId])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getProfileContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, account, library, chainId],
  )
}

export const useLotteryV2Contract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getLotteryV2Contract(chainId, library.getSigner()), [library, chainId])
}

export const useMasterchef = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getMasterchefContract(chainId, library.getSigner()), [library, chainId])
}

export const useSousChef = (id) => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getSouschefContract(id, chainId, library.getSigner()), [chainId, id, library])
}

export const usePointCenterIfoContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPointCenterIfoContract(chainId, library.getSigner()), [library, chainId])
}

export const useBunnySpecialContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialContract(chainId, library.getSigner()), [library, chainId])
}

export const useClaimRefundContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getClaimRefundContract(chainId, library.getSigner()), [library, chainId])
}

export const useTradingCompetitionContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getTradingCompetitionContract(chainId, library.getSigner()), [library, chainId])
}

export const useTradingCompetitionContractV2 = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getTradingCompetitionContractV2(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [library, withSignerIfPossible, account, chainId],
  )
}

export const useEasterNftContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getEasterNftContract(chainId, library.getSigner()), [library, chainId])
}

export const useVaultPoolContract = (vaultKey: VaultKey): CakeVault | IfoPool => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => {
    return vaultKey === VaultKey.CakeVault
      ? getCakeVaultContract(chainId, library.getSigner())
      : getIfoPoolContract(chainId, library.getSigner())
  }, [chainId, library, vaultKey])
}

export const useCakeVaultContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getCakeVaultContract(chainId, library.getSigner()), [library, chainId])
}

export const useIfoPoolContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getIfoPoolContract(chainId, library.getSigner()), [library, chainId])
}

export const usePredictionsContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPredictionsContract(chainId, library.getSigner()), [chainId, library])
}

export const useChainlinkOracleContract = (withSignerIfPossible = true) => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => getChainlinkOracleContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [account, chainId, library, withSignerIfPossible],
  )
}

export const useSpecialBunnyCakeVaultContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialCakeVaultContract(chainId, library.getSigner()), [chainId, library])
}

export const useSpecialBunnyPredictionContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialPredictionContract(chainId, library.getSigner()), [library, chainId])
}

export const useBunnySpecialLotteryContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialLotteryContract(chainId, library.getSigner()), [library, chainId])
}

export const useBunnySpecialXmasContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialXmasContract(chainId, library.getSigner()), [library, chainId])
}

export const useAnniversaryAchievementContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getAnniversaryAchievementContract(chainId, library.getSigner()), [library, chainId])
}

export const useNftSaleContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getNftSaleContract(chainId, library.getSigner()), [library, chainId])
}

export const usePancakeSquadContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getPancakeSquadContract(chainId, library.getSigner()), [library, chainId])
}

export const useFarmAuctionContract = (withSignerIfPossible = true) => {
  const { chainId, account, library } = useActiveWeb3React()
  return useMemo(
    () => getFarmAuctionContract(chainId, withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [library, account, withSignerIfPossible, chainId],
  )
}

export const useNftMarketContract = () => {
  const { chainId, library } = useActiveWeb3React()
  return useMemo(() => getNftMarketContract(chainId, library.getSigner()), [library, chainId])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { chainId, library, account } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(chainId, null, collectionAddress),
      signer: getErc721CollectionContract(chainId, getProviderOrSigner(library, account), collectionAddress),
    }),
    [account, library, collectionAddress, chainId],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || address === '0x0000000000000000000000000000000000000000' || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case ChainId.BSC:
      case ChainId.BSC_TESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract<EnsRegistrar>(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IPancakePair | null {
  return useContract(pairAddress, IPancakePairABI, withSignerIfPossible)
}
export const parseAddress = (currAddress: Address, chainId: ChainId) => {
  return currAddress[chainId]
}

const useAddress = (curAddresses: Address) => {
  const { chainId } = useActiveWeb3React()
  const [address, setAddress] = useState(parseAddress(curAddresses, chainId))
  useEffect(() => {
    setAddress(parseAddress(curAddresses, chainId))
  }, [chainId, curAddresses])
  return address
}
export const useMulticallAddress = () => {
  return useAddress(addresses.multiCall)
}

export function useMulticallContract() {
  return useContract<Multicall>(useMulticallAddress(), multiCallAbi, false)
}
