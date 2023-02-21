import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  ml?: string
}

const GlobalSettings = ({ color, mr = '8px', ml = '8px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <CustomButton
        onClick={onPresentSettingsModal}
        variant="text"
        scale="sm"
        mr={mr}
        ml={ml}
        id="open-settings-dialog-button"
      >
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </CustomButton>
    </Flex>
  )
}

export default GlobalSettings

const CustomButton = styled(IconButton)`
  background: ${({ theme }) => theme.colors.bgButton};
  border-radius: 12px;
  min-width: 40px;
  height: 40px;
`
