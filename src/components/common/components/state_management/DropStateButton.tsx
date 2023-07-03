import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'devextreme-react/popup'
import List from 'devextreme-react/list'
import Button from '../Button'
import { dropState } from '../../LocalStorage'
import { dropState as dropStateAction } from '../../store/view_state/Actions'
import getStorageItemKey from './Utils'
import { PopupProps } from '../../Interfaces'
import { stateNamesSelector, saltSelector } from '../../store/view_state/Selectors'

function DropStateButton() {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)

    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    return (
        <div className='CommandButton'>
            <Button
                icon='remove'
                hint='Drop state'
                onClick={onClick} />
            <DropStatePopup
                visible={popupVisible}
                onHiding={onHiding} />
        </div>
    )
}

export default React.memo(DropStateButton)


function DropStatePopup(props: PopupProps) {
    const stateNames = useSelector(stateNamesSelector)
    const salt = useSelector(saltSelector)
    const dispatch = useDispatch()
    const onItemDeleted = ({ itemData: stateName }: { itemData: string } | any) => {
        dispatch(dropStateAction(stateName))
        dropState(getStorageItemKey(salt, stateName))
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
