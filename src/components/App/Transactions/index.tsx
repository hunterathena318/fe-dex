import { HistoryIcon, useModal, IconButton } from '@pancakeswap/uikit'
import styled from 'styled-components'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <CustomButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
        <img src="/images/swap/share.png" alt="Get some help" />
      </CustomButton>
    </>
  )
}

export default Transactions

const CustomButton = styled(IconButton)`
  background: ${({ theme }) => theme.colors.bgButton};
  border-radius: 12px;
  min-width: 40px;
  height: 40px;
`
