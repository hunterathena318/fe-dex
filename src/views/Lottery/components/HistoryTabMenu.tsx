import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const StyledButtonMenu = styled.div<{ activeIndex: number }>`
  div {
    border: none;
    height: 40px;
    border-radius: 8px;
    background: #1f2026;
  }
  button {
    height: 100%;
    border-radius: 8px;
  }
  .btn_all_history {
    background: ${({ theme, activeIndex }) => (activeIndex === 0 ? theme.colors.bgPrimaryButton : '')};
    color: ${({ theme, activeIndex }) => (activeIndex === 0 ? theme.colors.text : '')};
  }
  .btn_history {
    background: ${({ theme, activeIndex }) => (activeIndex === 1 ? theme.colors.bgPrimaryButton : '')};
    color: ${({ theme, activeIndex }) => (activeIndex === 1 ? theme.colors.text : '')};
  }
`
const HistoryTabMenu = ({ setActiveIndex, activeIndex }) => {
  const { t } = useTranslation()

  return (
    <StyledButtonMenu activeIndex={activeIndex}>
      <ButtonMenu activeIndex={activeIndex} onItemClick={setActiveIndex} scale="sm" variant="subtle">
        <ButtonMenuItem className="btn_all_history" style={{ fontSize: '14px', fontFamily: 'Inter' }}>
          {t('All History')}
        </ButtonMenuItem>
        <ButtonMenuItem className="btn_history" style={{ fontSize: '14px', fontFamily: 'Inter' }}>
          {t('Your History')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledButtonMenu>
  )
}

export default HistoryTabMenu
