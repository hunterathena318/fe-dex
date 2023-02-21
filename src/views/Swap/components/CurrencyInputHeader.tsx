import { Flex, Heading, IconButton, NotificationDot, Text, useModal } from '@pancakeswap/uikit'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'
import styled from 'styled-components'

interface Props {
  title: string
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
}

const CurrencyInputContainer = styled(Flex)`
  flex-direction: column;
  align-items: baseline;
  padding: 24px 24px 0;
  width: 100%;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
`
const CustomButton = styled(IconButton)`
  background: ${({ theme }) => theme.colors.bgButton};
  border-radius: 12px;
  min-width: 40px;
  height: 40px;
`
const WrapActionMobile = styled(Flex)`
  justify-content: space-between;
  padding: 24px 4px 0;
  @media (min-width: 768px) {
    display: none;
  }
`

const WrapActionWeb = styled(Flex)`
  @media (max-width: 768px) {
    display: none;
  }
`

const CurrencyInputHeader: React.FC<Props> = ({
  title,
  subtitle,
  setIsChartDisplayed,
  isChartDisplayed,
  hasAmount,
  onRefreshPrice,
}) => {
  const [expertMode] = useExpertModeManager()
  const toggleChartDisplayed = () => {
    setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)

  return (
    <CurrencyInputContainer>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        {/* {setIsChartDisplayed && (
          <CustomButton onClick={toggleChartDisplayed} variant="text" scale="sm">
            {isChartDisplayed ? <ChartDisableIcon color="textSubtle" /> : <ChartIcon width="24px" color="textSubtle" />}
          </CustomButton>
        )} */}
        <Flex flexDirection="column" alignItems="flex-start" width="100%" mr={18}>
          <Heading as="h2">{title}</Heading>
        </Flex>
        <WrapActionWeb>
          <CustomButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
            <img src="/images/swap/share.png" alt="Get some help" />
            {/* <HistoryIcon color="textSubtle" width="24px" /> */}
          </CustomButton>
          <NotificationDot show={expertMode}>
            <Flex
              background="#3b3c4e"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="12px"
              width="40px"
              height="40px"
              marginLeft="6px"
            >
              <GlobalSettings color="textSubtle" mr="0" ml="0" />
            </Flex>
          </NotificationDot>
          {/* <IconButton variant="text" scale="sm" onClick={() => onRefreshPrice()}>
            <RefreshIcon disabled={!hasAmount} color="textSubtle" width="27px" />
          </IconButton> */}
        </WrapActionWeb>
      </Flex>
      <Flex width="100%" alignItems="center" borderBottom="1px solid rgba(129, 75, 246, 0.4)" paddingBottom="8px">
        <Text color="textSubtle" fontSize="14px">
          {subtitle}
        </Text>
      </Flex>

      <WrapActionMobile width="100%" alignItems="center">
        <Flex>
          {setIsChartDisplayed && (
            <CustomButton onClick={toggleChartDisplayed} variant="text" scale="sm">
              <img src="/images/swap/show-chart.png" alt="Show chart" />
              {/* {isChartDisplayed ? <ChartDisableIcon color="textSubtle" /> : <ChartIcon width="24px" color="textSubtle" />} */}
            </CustomButton>
          )}
        </Flex>
        <Flex>
          <CustomButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
            <img src="/images/swap/share.png" alt="Get some help" />
          </CustomButton>
          <NotificationDot show={expertMode}>
            <Flex
              background="#3b3c4e"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="12px"
              width="40px"
              height="40px"
              marginLeft="6px"
            >
              <GlobalSettings color="textSubtle" mr="0" ml="0" />
            </Flex>
          </NotificationDot>
        </Flex>
      </WrapActionMobile>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
