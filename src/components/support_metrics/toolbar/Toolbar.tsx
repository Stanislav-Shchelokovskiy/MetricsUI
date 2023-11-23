import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import CheckBox from 'devextreme-react/check-box'
import HelpButton from '../../common/components/help/HelpButton'
import { SettingsProps } from '../../common/components/multiset_container/Toolbar/AdvancedSettings'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'
import { baselineAlignedModeSelector } from '../store/Selectors'
import { changeBaselineAlignedMode } from '../store/actions/Common'
import { fetchHelp } from '../network_resource_fetcher/Help'
import { SupportMetricsStore } from '../store/Store'

export default function SupportMetricsToolbar(props: ToolbarProps) {
    return (
        <Toolbar
            {...props}
            settings={Settings}
        >
            <HelpButton
                visible={props.menuOpened}
                fetchHelpItems={fetchHelp}
            />
        </Toolbar>
    )
}

function Settings(props: SettingsProps) {
    const ref = useRef<CheckBox>(null)
    const dispatch = useDispatch()
    const baselineAlignedModeEnabled = useSelector<SupportMetricsStore, boolean>(baselineAlignedModeSelector)
    if (props.dispatchRef.current) {
        props.dispatchRef.current.dispatch = () => {
            const newVal = !!ref.current?.instance.option('value')
            if (newVal !== baselineAlignedModeEnabled) {
                dispatch(changeBaselineAlignedMode(newVal))
            }
        }
    }
    return <CheckBox
        ref={ref}
        text='Baseline aligned mode'
        focusStateEnabled={false}
        defaultValue={baselineAlignedModeEnabled}
    />
}
