import React, { useCallback, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { saveState } from '../../LocalStorage'
import InputBox from '../InputBox'
import Button from '../Button'
import { registerState } from '../../store/state/Actions'
import getStorageItemKey from './Utils'
import { KeyProps } from './Interfaces'

function SaveStateButton(props: KeyProps) {
    const [inputBoxVisible, setInputBoxVisible] = useState(false)
    const currentStateName = useSelector(props.stateNameSelector)

    const onClick = () => setInputBoxVisible(true)
    const onHiding = useCallback(() => {
        setInputBoxVisible(false)
    }, [])

    const store = useStore()
    const dispatch = useDispatch()
    const onPopupOkClick = (value: string | undefined) => {
        if (value) {
            saveState(store.getState(), getStorageItemKey(props.state_salt, value))
            dispatch(registerState(value))
        }
        onHiding()
    }

    return (
        <div className={props.className}>
            <Button
                icon='save'
                hint='Save state'
                onClick={onClick} />
            <InputBox
                title='Save as'
                visible={inputBoxVisible}
                value={currentStateName}
                onHiding={onHiding}
                onOkClick={onPopupOkClick} />
        </div>
    )
}

export default React.memo(SaveStateButton)
