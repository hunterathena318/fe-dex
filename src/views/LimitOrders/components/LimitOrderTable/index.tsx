import { useState, useCallback, memo } from 'react'
import { Flex, Card } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useGelatoLimitOrdersHistory from '../../hooks/useGelatoLimitOrdersHistory'

import OrderTab from './OrderTab'
import { ORDER_CATEGORY } from '../../types'

import CompactLimitOrderTable from './CompactLimitOrderTable'
import NoOrdersMessage from './NoOrdersMessage'
import LoadingTable from './LoadingTable'
import SpaciousLimitOrderTable from './SpaciousLimitOrderTable'
import Navigation from './TableNavigation'

const OrderTable: React.FC<{ isCompact: boolean; orderCategory: ORDER_CATEGORY }> = memo(
  ({ orderCategory, isCompact }) => {
    const orders = useGelatoLimitOrdersHistory(orderCategory)

    if (!orders) return <LoadingTable />

    if (!orders?.length) {
      return <NoOrdersMessage orderCategory={orderCategory} />
    }

    return (
      <Navigation data={orders} resetFlag={orderCategory}>
        {({ paginatedData }) =>
          isCompact ? (
            <CompactLimitOrderTable orders={paginatedData} />
          ) : (
            <SpaciousLimitOrderTable orders={paginatedData} />
          )
        }
      </Navigation>
    )
  },
)
const CardOrderLimit = styled(Card)`
  width: 100%;
  height: max-content;
  border: ${({ theme }) => theme.colors.borderBtn};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(129, 75, 246, 0.2);
  backdrop-filter: blur(10px);
`
const LimitOrderTable: React.FC<{ isCompact: boolean }> = ({ isCompact }) => {
  const [activeTab, setIndex] = useState<ORDER_CATEGORY>(ORDER_CATEGORY.Open)
  const handleClick = useCallback((tabType: ORDER_CATEGORY) => setIndex(tabType), [])

  return (
    <Flex flex="1" justifyContent="center" mb="24px">
      <CardOrderLimit background="none">
        <OrderTab onItemClick={handleClick} activeIndex={activeTab} />
        <OrderTable orderCategory={activeTab} isCompact={isCompact} />
      </CardOrderLimit>
    </Flex>
  )
}

export default memo(LimitOrderTable)
