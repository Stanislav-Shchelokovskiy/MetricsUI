import React, { useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import Button from '../../common/components/Button'
import { CheckBox } from 'devextreme-react/check-box'
import { CustomersActivityStore } from '../store/Store'
import { changeBaselineAlignedMode } from '../store/actions/Common'
import { PopupProps } from '../../common/Interfaces'

interface AdvancedSettings {
    baselineAlignedMode: boolean
}

type SettingsPopupProps = AdvancedSettings & PopupProps


export default function AdvancedSettingsButton({ visible }: { visible: boolean }) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)
    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    const baselineAlignedModeEnabled = useSelector((store: CustomersActivityStore) => store.customersActivity.baselineAlignedModeEnabled)
    const settingsModified = isAnySettingModified({ baselineAlignedMode: baselineAlignedModeEnabled })
    if (visible) {
        return (
            <div className='CommandButton'>
                <Button
                    icon='preferences'
                    hint={"Sets' advanced settings" + (settingsModified ? ' (modified)' : '')}
                    onClick={onClick}
                    type={settingsModified ? 'default' : 'normal'} />
                <AdvancedSettingsPopup
                    baselineAlignedMode={baselineAlignedModeEnabled}
                    visible={popupVisible}
                    onHiding={onHiding} />
            </div>
        )
    }
    return null
}

function isAnySettingModified(settings: AdvancedSettings) {
    if (settings.baselineAlignedMode !== false)
        return true
    return false
}


function AdvancedSettingsPopup(props: SettingsPopupProps) {

    const baselineAlignedModeCheckBoxRef = useRef<CheckBox>(null)
    baselineAlignedModeCheckBoxRef.current?.instance.option('value', props.baselineAlignedMode)

    const appDispatch = useDispatch()
    const onOkClick = useCallback(() => {
        const newbaselineAlignedModeEnabled = baselineAlignedModeCheckBoxRef.current?.instance.option('value')
        if (newbaselineAlignedModeEnabled !== props.baselineAlignedMode)
            appDispatch(changeBaselineAlignedMode((newbaselineAlignedModeEnabled as boolean)))
        props.onHiding()
    }, [props.baselineAlignedMode])

    const okButtonOptions = {
        text: 'Ok',
        type: 'normal',
        stylingMode: 'outlined',
        focusStateEnabled: false,
        onClick: onOkClick,
    }
    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Advanced Settings'
            maxWidth='30vw'
            maxHeight='40vh'
        >
            <CheckBox
                ref={baselineAlignedModeCheckBoxRef}
                text='Baseline Aligned Mode'
                focusStateEnabled={false}
                defaultValue={props.baselineAlignedMode}
            />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={okButtonOptions}
            />
        </Popup>
    )
}
