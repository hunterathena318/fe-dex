import { Interface } from '@ethersproject/abi'
import { ethers } from 'ethers'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress } from './addressHelpers'
import getProvider from './getProvider'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

export interface MulticallOptions {
  requireSuccess?: boolean
}

const multicall = async (chainId: number, abi: any[], calls: Call[]) => {
  const multicallAddress = getMulticallAddress(chainId)
  const provider = getProvider(chainId)
  const multi = new ethers.Contract(multicallAddress, multicallABI, provider)
  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.aggregate(calldata)
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(
  chainId: number,
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<T> => {
  const { requireSuccess } = options
  const multicallAddress = getMulticallAddress(chainId)
  const provider = getProvider(chainId)
  const multi = new ethers.Contract(multicallAddress, multicallABI, provider)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))

  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res as any
}

export default multicall
