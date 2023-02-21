import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { CHAIN_ID } from 'config/constants/networks'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl(Number(CHAIN_ID))

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL)

export default null
