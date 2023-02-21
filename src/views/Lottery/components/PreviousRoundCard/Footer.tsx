import { useEffect, useState } from 'react'
import { Flex, ExpandableLabel, CardFooter } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { LotteryRound } from 'state/types'
import styled from 'styled-components'
import FooterExpanded from './FooterExpanded'

const BoxToggleDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  button {
    color: #c770e6;
  }
  svg {
    fill: #c770e6;
  }
`

interface PreviousRoundCardFooterProps {
  lotteryNodeData: LotteryRound
  lotteryId: string
}

const PreviousRoundCardFooter: React.FC<PreviousRoundCardFooterProps> = ({ lotteryNodeData, lotteryId }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (!lotteryId) {
      setIsExpanded(false)
    }
  }, [lotteryId])

  return (
    <CardFooter p="0" style={{ borderTopColor: 'rgba(129, 75, 246, 0.4)' }}>
      {isExpanded && <FooterExpanded lotteryNodeData={lotteryNodeData} lotteryId={lotteryId} />}
      <BoxToggleDetail>
        <ExpandableLabel
          expanded={isExpanded}
          onClick={() => {
            if (lotteryId) {
              setIsExpanded(!isExpanded)
            }
          }}
        >
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </BoxToggleDetail>
    </CardFooter>
  )
}

export default PreviousRoundCardFooter
