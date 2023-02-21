import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { ORDER_CATEGORY } from '../../types'

const Wrapper = styled.div`
  border-bottom: ${({ theme }) => theme.colors.borderBtn};
  margin: 0 24px;
`
const OrderLimitMenu = styled(ButtonMenu)`
  border: none;
  background: none;
`
const OrderLimitButton = styled(ButtonMenuItem)<{ display: boolean }>`
  background: none;
  padding: 0;
  border-radius: 0;
  color: #fff;
  border-radius: 1em;
  position: relative;
  margin-right: 25px;
  font-weight: 500;
  font-family: 'Inter';
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  &:before {
    content: '';
    height: 3px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, red, orange);
    display: ${({ display }) => (display ? 'block' : 'none')};
  }
`
interface OrderTabProps {
  activeIndex: ORDER_CATEGORY
  onItemClick: (index: ORDER_CATEGORY) => void
}

const OrderTab: React.FC<OrderTabProps> = ({ activeIndex, onItemClick }) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  return (
    <Wrapper>
      <OrderLimitMenu activeIndex={activeIndex} onItemClick={onItemClick}>
        {[t('Open Orders'), t('Order History')].map((content, idx) => (
          <OrderLimitButton
            key={content}
            style={{
              color: idx === activeIndex ? theme.colors.text : theme.colors.grey,
            }}
            display={idx === activeIndex}
          >
            {content}
          </OrderLimitButton>
        ))}
      </OrderLimitMenu>
    </Wrapper>
  )
}

export default OrderTab
