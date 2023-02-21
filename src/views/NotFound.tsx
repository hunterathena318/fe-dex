import styled from 'styled-components'
import { Button, Heading, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import Link from 'next/link'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const MainHeading = styled(Heading)`
  font-size: 60px;
  text-shadow: 0px 0px 20px #8668df;
  margin: 36px 0 24px;
  font-family: Inter;
`

const Content = styled(Text)`
  font-family: Inter;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        <img src="/images/mascot.png" alt="Logo" width={197} />
        <MainHeading scale="xxl">404</MainHeading>
        <Content mb="16px" fontSize="16px">
          {t('Oops, page not found.')}
        </Content>
        <Link href="/" passHref>
          <Button
            style={{
              fontFamily: 'Inter',
            }}
            as="a"
            scale="sm"
            variant="linear"
          >
            {t('Back Home')}
          </Button>
        </Link>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
