import { Box, ButtonMenu, ButtonMenuItem, Flex } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import styled from 'styled-components'
// import Search from 'views/Info/components/InfoSearch'

const NavWrapper = styled(Flex)`
  background: rgb(40 25 81);
  justify-content: space-between;
  padding: 20px 16px;
  flex-direction: column;
  box-shadow: 0px 10px 10px 4px rgb(40 25 81), inset 0px 1px 0px rgb(129 75 246 / 20%);
  gap: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 40px;
    flex-direction: row;
  }
`
const BoxButtonMenu = styled('div')<{
  activeIndex: number
}>`
  div {
    border: none;
    background: #3b3c4e;
    border-radius: 8px;
    height: 40px;
  }
  a {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: rgba(255, 255, 255, 0.3);
    height: 100%;
    min-width: 100px;
  }
  a:nth-child(${({ activeIndex }) => activeIndex + 1}) {
    background: ${({ theme }) => theme.colors.bgPrimaryButton} !important;
    border-radius: 8px;
    color: #fff;
  }
`

const InfoNav = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPools = router.asPath.includes('/info/pools') || router.asPath.includes('/info/pool')
  const isTokens = router.asPath.includes('/info/tokens') || router.asPath.includes('/info/token')
  let activeIndex = 0
  if (isPools) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  return (
    <NavWrapper>
      <Box>
        <BoxButtonMenu activeIndex={activeIndex}>
          <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
            <ButtonMenuItem as={NextLinkFromReactRouter} to="/info">
              {t('Overview')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to="/info/pools">
              {t('Pools')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to="/info/tokens">
              {t('Tokens')}
            </ButtonMenuItem>
          </ButtonMenu>
        </BoxButtonMenu>
      </Box>
      <Box width={['100%', '100%', '250px']}>{/* <Search /> */}</Box>
    </NavWrapper>
  )
}

export default InfoNav
