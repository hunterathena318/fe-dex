import { Order } from '@gelatonetwork/limit-orders-lib'
import { Flex, ChevronRightIcon, Text, Box, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useFormattedOrderData from 'views/LimitOrders/hooks/useFormattedOrderData'
import CurrencyFormat from './CurrencyFormat'
import { DetailLimitOrderModal } from './DetailLimitOrderModal'
import OrderStatus from './OrderStatus'

interface CompactRowProps {
  order: Order
}

const CompactRow: React.FC<CompactRowProps> = ({ order }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const formattedOrder = useFormattedOrderData(order)
  const { inputToken, outputToken, inputAmount, outputAmount, executionPrice } = formattedOrder
  const [openDetailLimitOrderModal] = useModal(<DetailLimitOrderModal order={order} formattedOrder={formattedOrder} />)

  return (
    <Flex width="100%" justifyContent="center" alignItems="center" onClick={openDetailLimitOrderModal}>
      <Box width="100%">
        <Flex mb="16px">
          <CurrencyFormat bold currency={inputToken} chainId={chainId} />
          <ChevronRightIcon color="textSubtle" />
          <CurrencyFormat bold currency={outputToken} chainId={chainId} />
          <OrderStatus formattedOrder={formattedOrder} />
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
            {t('From')}
          </Text>
          <Text small textTransform="uppercase">{`${inputAmount} ${inputToken?.getSymbol(chainId)}`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
            {t('To')}
          </Text>
          <Text small textTransform="uppercase">{`${outputAmount} ${outputToken?.getSymbol(chainId)}`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
            {t('Price')}
          </Text>
          <Text small>{`${executionPrice} ${outputToken?.getSymbol(chainId)} per ${inputToken?.getSymbol(
            chainId,
          )}`}</Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default CompactRow
