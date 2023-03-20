import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'devextreme-react/popup'
import List from 'devextreme-react/list'
import Button from '../Button'
import { dropState } from '../../LocalStorage'
import { dropState as dropStateAction } from '../../store/state/Actions'
import { ValuesProps, ValuesPopupProps } from './Interfaces'
import getStorageItemKey from './Utils'


function DropStateButton(props: ValuesProps) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)

    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    return (
        <div className={props.className}>
            <Button
                icon='remove'
                hint='Drop state'
                onClick={onClick} />
            <DropStatePopup
                {...props}
                visible={popupVisible}
                onHiding={onHiding} />
        </div>
    )
}

export default React.memo(DropStateButton)


function DropStatePopup(props: ValuesPopupProps) {
    const stateNames = useSelector(props.stateNamesSelector)
    const dispatch = useDispatch()
    const onItemDeleted = (e: any) => {
        const key = e.itemData
        dispatch(dropStateAction(key))
        dropState(getStorageItemKey(props.state_salt, key))
    }

    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Drop state'
            maxWidth='40vw'
            maxHeight='50vh'
        >
            <List
                dataSource={[...stateNames]}
                allowItemDeleting={true}
                itemDeleteMode='toggle'
                onItemDeleted={onItemDeleted}>
            </List>
        </Popup>
    )
}
