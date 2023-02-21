import { Button, useModal, WaitIcon, ButtonProps } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useLottery } from 'state/lottery/hooks'
import { LotteryStatus } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BuyTicketsModal from './BuyTicketsModal/BuyTicketsModal'

const disableChainId = {
  56: false,
  97: false,
  137: false,
  80001: true,
  1: false,
  4: true,
  43114: true,
}

interface BuyTicketsButtonProps extends ButtonProps {
  disabled?: boolean
  text?: string
}


const BuyTicketsButton: React.FC<BuyTicketsButtonProps> = ({text, disabled, ...props }) => {
  const { t } = useTranslation()
  const [onPresentBuyTicketsModal] = useModal(<BuyTicketsModal />)
  const { chainId } = useActiveWeb3React()

  const {
    currentRound: { status },
  } = useLottery()

  

  const getBuyButtonText = () => {
    if (status === LotteryStatus.OPEN && disableChainId[chainId] !== false) {
      return (text ?? 'Buy Now')
    }

    return (
      <>
        <WaitIcon mr="4px" color="textDisabled" /> {t('On sale soon!')}
      </>
    )
  }

  return (
    <Button {...props} disabled={disabled} onClick={onPresentBuyTicketsModal} >
      {getBuyButtonText()}
    </Button>
  )
}

export default BuyTicketsButton
