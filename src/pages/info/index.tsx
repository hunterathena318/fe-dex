import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetInfoData } from 'state/info/actions'
import { InfoPageLayout } from 'views/Info'
import Overview from 'views/Info/Overview'
import { AppDispatch } from 'state'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const InfoPage = () => {
  return <Overview />
}

InfoPage.Layout = InfoPageLayout

export default InfoPage
