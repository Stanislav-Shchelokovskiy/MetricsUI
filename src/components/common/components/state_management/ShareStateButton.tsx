import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'devextreme-react/popup'
import List from 'devextreme-react/list'
import Button from '../Button'
import { dropState } from '../../LocalStorage'
import { dropState as dropStateAction } from '../../store/state/Actions'
import { KeyProps, ValuesPopupProps } from './Interfaces'
import getStorageItemKey from './Utils'


function ShareStateButton(props: KeyProps) {
    const onClick = () => { }

    return (
        <div className={props.className}>
            <Button
                icon='export'
                hint='Share state'
                onClick={onClick} />
        </div>
    )
}

export default React.memo(ShareStateButton)
