/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js'
import poolsDeployedBlockNumber from 'config/constants/poolsDeployedBlockNumber'
import poolsConfig from 'config/constants/pools'
import sousChefV2 from 'config/abi/sousChefV2.json'
import { CHAIN_ID } from 'config/constants/networks'
import getProvider from 'utils/getProvider'
import multicall from '../multicall'
import { simpleRpcProvider } from '../providers'
import { getAddress } from '../addressHelpers'

/**
 * Returns the total number of pools that were active at a given block
 */
export const getActivePools = async (chainId: number, block?: number) => {
  const eligiblePools = poolsConfig
    .filter((pool) => pool.sousId !== 0)
    .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)
    .filter((pool) => {
      const { contractAddress, deployedBlockNumber } = pool
      const address = getAddress(contractAddress)
      return (deployedBlockNumber && deployedBlockNumber < block) || poolsDeployedBlockNumber[address] < block
    })
  const provider = getProvider(chainId)
  const blockNumber = block || (await provider.getBlockNumber())
  const startBlockCalls = eligiblePools.map(({ contractAddress }) => ({
    address: getAddress(contractAddress),
    name: 'startBlock',
  }))
  const endBlockCalls = eligiblePools.map(({ contractAddress }) => ({
    address: getAddress(contractAddress),
    name: 'bonusEndBlock',
  }))
  const startBlocks = await multicall(Number(CHAIN_ID), sousChefV2, startBlockCalls)
  const endBlocks = await multicall(Number(CHAIN_ID), sousChefV2, endBlockCalls)

  return eligiblePools.reduce((accum, poolCheck, index) => {
    const startBlock = startBlocks[index] ? new BigNumber(startBlocks[index]) : null
    const endBlock = endBlocks[index] ? new BigNumber(endBlocks[index]) : null

    if (!startBlock || !endBlock) {
      return accum
    }

    if (startBlock.gte(blockNumber) || endBlock.lte(blockNumber)) {
      return accum
    }

    return [...accum, poolCheck]
  }, [])
}
