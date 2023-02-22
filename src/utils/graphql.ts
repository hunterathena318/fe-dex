import { ChainId } from '@techchainswapfinance/sdk'
import { getInfoClientUrl, INFO_CLIENT } from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  if (endpoint === INFO_CLIENT) {
    return {
      // 'X-Sf':
      //   process.env.NEXT_PUBLIC_SF_HEADER ||
      //   // hack for inject CI secret on window
      //   (typeof window !== 'undefined' &&
      //     // @ts-ignore
      //     window.sfHeader),
    }
  }
  return undefined
}

export const infoClient = (chainId: number) =>
  new GraphQLClient(getInfoClientUrl(chainId), { headers: getGQLHeaders(getInfoClientUrl(chainId)) })

export const infoServerClient = (chainId: number) =>
  new GraphQLClient(getInfoClientUrl(chainId), {
    headers: {
      // 'X-Sf': process.env.SF_HEADER,
    },
    timeout: 5000,
  })

export const bitQueryServerClient = new GraphQLClient(process.env.NEXT_PUBLIC_BIT_QUERY_ENDPOINT, {
  headers: {
    // only server, no `NEXT_PUBLIC` not going to expose in client
    'X-API-KEY': process.env.BIT_QUERY_HEADER,
  },
  timeout: 5000,
})
