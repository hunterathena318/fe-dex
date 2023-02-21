import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (t, languageCode) => [
  {
    label: t('Trade'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Limit'),
        href: '/limit-orders',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  // {
  //   label: t('Lottery'),
  //   icon: SwapIcon,
  //   fillIcon: SwapFillIcon,
  //   href: '/lottery',
  //   showItemsOnMobile: false,
  //   items: [],
  // },
  {
    label: t('Info'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/info',
    showItemsOnMobile: false,
    items: [],
  },
]

export const configMenuAvalanche: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (
  t,
  languageCode,
) => [
  {
    label: t('Trade'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Limit'),
        href: '/limit-orders',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Info'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/info',
    showItemsOnMobile: false,
    items: [],
  },
]

export default config
