import React, { useCallback, useReducer, useState } from 'react'
import { useStore } from 'react-redux'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import TextBox from 'devextreme-react/text-box'
import Button from '../../common/components/Button'
import { saveState } from '../../common/LocalStorage'
import { useCustomersActivityDispatch, CustomersActivityStore, useCustomersActivitySelector } from '../store/Store'
import { addStateKey } from '../store/Actions'


function SaveStateButton() {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)

    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    return (
        <div className='CustomersActivitySaveStateButton'>
            <Button
                key='saveStateButton'
                icon='save'
                hint='Save state'
                onClick={onClick} />
            <SaveStatePopup
                visible={popupVisible}
                onHiding={onHiding} />
        </div>
    )
}

export default React.memo(SaveStateButton)


function SaveStatePopup({ visible, onHiding }: SaveStatePopupProps) {
    let key = useCustomersActivitySelector((state)=> state.viewState.key)

    const store = useStore<CustomersActivityStore>()
    const dispatch = useCustomersActivityDispatch()
    const onValueChange = (value: string) => {
        if (value === '')
            return
        key = value
    }

    const onClick = ()=>{
        saveState(store.getState(), key)
        dispatch(addStateKey(key))
        onHiding(key)
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
            visible={visible}
            onHiding={onHiding}
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

interface SaveStatePopupProps {
    visible: boolean
    onHiding: (e: any) => void
}
