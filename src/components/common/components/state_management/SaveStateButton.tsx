import React, { useCallback, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { saveState } from '../../LocalStorage'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import TextBox from 'devextreme-react/text-box'
import Button from '../Button'
import { registerState } from '../../store/state/Actions'
import getStorageItemKey from './Utils'
import { KeyProps, KeyPopupProps } from './Interfaces'

function SaveStateButton(props: KeyProps) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)

    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    return (
        <div className={props.className}>
            <Button
                key='saveStateButton'
                icon='save'
                hint='Save state'
                onClick={onClick} />
            <SaveStatePopup
                {...props}
                visible={popupVisible}
                onHiding={onHiding} />
        </div>
    )
}

export default React.memo(SaveStateButton)


function SaveStatePopup(props: KeyPopupProps) {
    let key = useSelector(props.keySelector)

    const store = useStore()
    const dispatch = useDispatch()
    const onValueChange = (value: string) => {
        if (value === '')
            return
        key = value
    }

    const onClick = () => {
        saveState(store.getState(), getStorageItemKey(props.state_salt, key))
        dispatch(registerState(key))
        props.onHiding()
    }

    const closeButtonOptions = {
        text: 'Ok',
        type: 'normal',
        stylingMode: 'outlined',
        focusStateEnabled: false,
        onClick: onClick,
    }

    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Enter state name'
            maxWidth='30vw'
            maxHeight='30vh'
        >
            <TextBox value={key} valueChangeEvent='focusout' onValueChange={onValueChange} />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={closeButtonOptions}
            />
        </Popup>
    )
}
