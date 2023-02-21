import { NETWORK_RPC } from 'config/constants/chains'
import random from 'lodash/random'

if (
  process.env.NODE_ENV !== 'production' &&
  (!process.env.NEXT_PUBLIC_NODE_1 || !process.env.NEXT_PUBLIC_NODE_2 || !process.env.NEXT_PUBLIC_NODE_3)
) {
  throw Error('One base RPC URL is undefined')
}

// Array of available nodes to connect to
export const nodes = [process.env.NEXT_PUBLIC_NODE_1, process.env.NEXT_PUBLIC_NODE_2, process.env.NEXT_PUBLIC_NODE_3]

const getNodeUrl = (chainId: number) => {
  if (!chainId) {
    return ''
  }
  let randomIndex = 0
  if (chainId) {
    randomIndex = random(0, NETWORK_RPC[chainId].length - 1)
  }
  return NETWORK_RPC[chainId][randomIndex]
}

export default getNodeUrl
