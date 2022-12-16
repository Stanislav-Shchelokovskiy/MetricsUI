import './styles/CustomersActivityContainer.css'
import './styles/CommonSettingsPanel.css'
import './styles/Set.css'

import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Drawer from 'devextreme-react/drawer'
import Toolbar from './toolbar/Toolbar'
import Plotly from 'plotly.js-basic-dist-min'
import CommonSettingsPanel from './commonSettingsPanel/CommonSettingsPanel'
import Sets from './content/Sets'
import ComparisonGraph from './ComparisonGraph'
import useQueryParams from '../common/hooks/UseQueryParams'
import { applyState, changeState } from '../common/store/state/Actions'
import { PullState } from '../common/network_resource_fetcher/FetchState'

export default function CustomersActivity() {
    const queryParams = useQueryParams()
    const stateId = queryParams.get('stateId')
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            if (stateId === null)
                return
            const fetchedState = await PullState(stateId)
            if (fetchedState.success) {
                dispatch(applyState(fetchedState.data))
                dispatch(changeState(stateId))
            }
        })()
    }, [stateId, dispatch])

    return <CustomersActivityContainer />
}

function CustomersActivityContainer() {
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        const timerId = setTimeout(() => {
            Plotly.Plots.resize('CustomersActivity_ComparisonGraph')
            clearTimeout(timerId)
        }, 500)
    }, [opened])

    const onShowChange = useCallback(() => setOpened(!opened), [opened])

    return (
        <div className='CustomersActivityContainer'>
            <Toolbar onShowChange={onShowChange} />
            <Drawer
                className='CustomersActivity_ContentDrawer'
                opened={opened}
                openedStateMode='shrink'
                position='left'
                revealMode='expand'
                component={Sets}
                closeOnOutsideClick={true}>
                <div className='CustomersActivityContent'>
                    <CommonSettingsPanel />
                    <ComparisonGraph />
                </div>
            </Drawer >
        </div >
    )
}
