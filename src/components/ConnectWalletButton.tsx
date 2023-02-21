import { Button, useWalletModal, ButtonProps } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import Trans from './Trans'

const ButtonConnect = styled(Button)`
  background: ${({ theme }) => theme.colors.bgPrimaryButton};
  font-size: 16px;
`
const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <ButtonConnect onClick={onPresentConnectModal} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </ButtonConnect>
  )
}

export default ConnectWalletButton
