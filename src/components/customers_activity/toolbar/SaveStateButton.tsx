import React, { useCallback, useReducer, useState } from 'react'
import { useStore } from 'react-redux'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import TextBox from 'devextreme-react/text-box'
import Button from '../../common/components/Button'
import { saveState } from '../../common/LocalStorage'
import { useCustomersActivityDispatch, CustomersActivityStore } from '../store/Store'
import { addStateKey } from '../store/Actions'


function SaveStateButton() {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)

    const onHiding = useCallback((e: any) => {
        console.log(e)
        setPopupVisible(false)
    }, [])

    return (
        <div className='CustomersActivitySaveStateButton'>
            <Button
                key='saveStateButton'
                icon='save'
                onClick={onClick} />
            <SaveStatePopup
                visible={popupVisible}
                onHiding={onHiding} />
        </div>
    )
}

export default React.memo(SaveStateButton)


function SaveStatePopup({ visible, onHiding }: SaveStatePopupProps) {
    const store = useStore<CustomersActivityStore>()

    const dispatch = useCustomersActivityDispatch()
    const onValueChange = (value: string) => {
        if (value === '')
            return
        saveState(store.getState(), value)
        dispatch(addStateKey(value))
    }

    const closeButtonOptions = {
        text: 'Ok',
        type: 'normal',
        stylingMode: 'outlined',
        focusStateEnabled: false,
        onClick: onHiding,
    }

    return (
        <Popup
            visible={visible}
            onHiding={onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Enter view name'
            maxWidth='30vw'
            maxHeight='30vh'
        >
            <TextBox value='' valueChangeEvent='focusout' onValueChange={onValueChange} />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={closeButtonOptions}
            />
        </Popup>
    )
}

interface SaveStatePopupProps {
    visible: boolean
    onHiding: (e: any) => void
}
