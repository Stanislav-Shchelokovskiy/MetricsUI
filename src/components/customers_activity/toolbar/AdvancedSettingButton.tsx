import React, { useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import Button from '../../common/components/Button'
import { CheckBox } from 'devextreme-react/check-box'
import { CustomersActivityStore } from '../store/Store'
import { changeTrackedCustomersGroupsMode } from '../store/Actions'
import { PopupProps } from '../../common/Interfaces'

interface AdvancedSettings {
    trackedCustomersGroupsModeEnabled: boolean
}

type SettingsPopupProps = AdvancedSettings & PopupProps


export default function AdvancedSettingsButton({ visible }: { visible: boolean }) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)
    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    const trackedCustomersGroupsModeEnabled = useSelector((store: CustomersActivityStore) => store.customersActivity.trackedCustomersGroupsModeEnabled)
    const settingsModified = isAnySettingModified({ trackedCustomersGroupsModeEnabled })
    if (visible) {
        return (
            <div className='CustomersActivity_AdvancedSettingsButton'>
                <Button
                    icon='preferences'
                    hint={"Sets' advanced settings" + (settingsModified ? ' (modified)' : '')}
                    onClick={onClick}
                    type={settingsModified ? 'default' : 'normal'} />
                <AdvancedSettingsPopup
                    trackedCustomersGroupsModeEnabled={trackedCustomersGroupsModeEnabled}
                    visible={popupVisible}
                    onHiding={onHiding} />
            </div>
        )
    }
    return null
}

function isAnySettingModified(settings: AdvancedSettings) {
    if (settings.trackedCustomersGroupsModeEnabled !== false)
        return true
    return false
}


function AdvancedSettingsPopup(props: SettingsPopupProps) {

    const trackedCustomersGroupsModeCheckBoxRef = useRef<CheckBox>(null)
    trackedCustomersGroupsModeCheckBoxRef.current?.instance.option('value', props.trackedCustomersGroupsModeEnabled)

    const appDispatch = useDispatch()
    const onOkClick = useCallback(() => {
        const newTrackedCustomersGroupsModeEnabled = trackedCustomersGroupsModeCheckBoxRef.current?.instance.option('value')
        if (newTrackedCustomersGroupsModeEnabled !== props.trackedCustomersGroupsModeEnabled)
            appDispatch(changeTrackedCustomersGroupsMode((newTrackedCustomersGroupsModeEnabled as boolean)))
        props.onHiding()
    }, [props.trackedCustomersGroupsModeEnabled])

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
                ref={trackedCustomersGroupsModeCheckBoxRef}
                text='Tracked Users Groups Mode'
                focusStateEnabled={false}
                defaultValue={props.trackedCustomersGroupsModeEnabled}
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
