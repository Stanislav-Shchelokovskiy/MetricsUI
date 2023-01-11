import React, { useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import Button from '../../common/components/Button'
import { CheckBox } from 'devextreme-react/check-box'
import { CustomersActivityStore } from '../store/Store'
import { changeTrackedCustomersGroupsMode } from '../store/Actions'
import { PopupProps } from '../../common/Interfaces'


export default function AdvancedSettingsButton({ visible }: { visible: boolean }) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)
    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])
    
    if (visible) {
        return (
            <div className='CustomersActivity_AdvancedSettingsButton'>
                <Button
                    icon='preferences'
                    hint="Sets' advanced settings"
                    onClick={onClick} />
                <AdvancedSettingsPopup
                    visible={popupVisible}
                    onHiding={onHiding} />
            </div>
        )
    }
    return null
}


function AdvancedSettingsPopup(props: PopupProps) {
    const trackedCustomersGroupsModeEnabled = useSelector((store: CustomersActivityStore) => store.customersActivity.trackedCustomersGroupsModeEnabled)
    const trackedCustomersGroupsModeCheckBoxRef = useRef<CheckBox>(null)
    trackedCustomersGroupsModeCheckBoxRef.current?.instance.option('value', trackedCustomersGroupsModeEnabled)

    const appDispatch = useDispatch()
    const onOkClick = useCallback(() => {
        const newTrackedCustomersGroupsModeEnabled = trackedCustomersGroupsModeCheckBoxRef.current?.instance.option('value')
        if (newTrackedCustomersGroupsModeEnabled !== trackedCustomersGroupsModeEnabled)
            appDispatch(changeTrackedCustomersGroupsMode((newTrackedCustomersGroupsModeEnabled as boolean)))
        props.onHiding()
    }, [trackedCustomersGroupsModeEnabled])

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
                defaultValue={trackedCustomersGroupsModeEnabled}
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
