import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from '@pancakeswap/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import { isMobile } from 'react-device-detect'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 24px;
  padding: 24px 12px 12px 12px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 24px;
    align-items: center;
    justify-content: space-between;
    flex-direction: unset;
    gap: 0;
  }
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <Link passHref href={backTo}>
            <IconButton as="a">
              <ArrowBackIcon width="32px" />
            </IconButton>
          </Link>
        )}
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px" fontFamily="Inter" fontSize={isMobile ? '20px !important' : '24px'}>
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />}
            <Text fontSize={isMobile ? '12px !important' : '14px'} color="grey">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <Transactions />
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
