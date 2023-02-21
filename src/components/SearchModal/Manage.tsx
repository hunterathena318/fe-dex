import { useState } from 'react'
import { Token } from '@gemuni/sdk'
import { ButtonMenu, ButtonMenuItem, ModalBody } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { TokenList } from '@uniswap/token-lists'
import { useTranslation } from 'contexts/Localization'
import ManageLists from './ManageLists'
import ManageTokens from './ManageTokens'
import { CurrencyModalView } from './types'

const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
`

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const [showLists, setShowLists] = useState(true)

  const { t } = useTranslation()

  return (
    <ModalBody>
      <StyledButtonMenu
        activeIndex={showLists ? 0 : 1}
        onItemClick={() => setShowLists((prev) => !prev)}
        scale="sm"
        variant="subtle"
        mb="32px"
      >
        <ButtonMenuItem
          width="50%"
          style={{ background: showLists ? 'linear-gradient(90deg, #06D3E6 -0.15%, #FFDB0D 96.99%)' : '' }}
        >
          {t('Lists')}
        </ButtonMenuItem>
        <ButtonMenuItem
          width="50%"
          style={{ background: !showLists ? 'linear-gradient(90deg, #06D3E6 -0.15%, #FFDB0D 96.99%)' : '' }}
        >
          {t('Tokens')}
        </ButtonMenuItem>
      </StyledButtonMenu>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </ModalBody>
  )
}
