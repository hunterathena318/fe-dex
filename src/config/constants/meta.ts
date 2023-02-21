import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'GemUni',
  description:
    'The most popular AMM on BSC by user count! Earn GENI through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Gemuni Exchange), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('GemUni')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('GemUni')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('GemUni')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('GemUni')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('GemUni')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('GemUni')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('GemUni')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('GemUni')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('GemUni')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('GemUni')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('GemUni')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('GemUni')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('GemUni')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('GemUni')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('GemUni')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('GemUni')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('GemUni')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('GemUni')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('GemUni Info & Analytics')}`,
        description: 'View statistics for GemUni exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('GemUni Info & Analytics')}`,
        description: 'View statistics for GemUni exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('GemUni Info & Analytics')}`,
        description: 'View statistics for GemUni exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('GemUni')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('GemUni')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('GemUni')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('GemUni')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('GemUni')}`,
      }
    default:
      return null
  }
}
