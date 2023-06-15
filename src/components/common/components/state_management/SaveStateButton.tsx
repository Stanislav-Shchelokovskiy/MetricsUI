import React, { useCallback, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { saveState } from '../../LocalStorage'
import InputBox from '../InputBox'
import Button from '../Button'
import { registerState } from '../../store/view_state/Actions'
import getStorageItemKey from './Utils'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'
import { stateNameSelector } from '../../store/view_state/Selectors'

function SaveStateButton() {
    const context = useMultisetContainerContext()
    const stateName = useSelector(stateNameSelector)
    const [inputBoxVisible, setInputBoxVisible] = useState(false)

    const onClick = () => setInputBoxVisible(true)
    const onHiding = useCallback(() => {
        setInputBoxVisible(false)
    }, [])

    const store = useStore()
    const dispatch = useDispatch()
    const onPopupOkClick = (value: string | undefined) => {
        if (value) {
            saveState(store.getState(), getStorageItemKey(context.stateManagement.stateSalt, value))
            dispatch(registerState(value))
        }
        onHiding()
    }

    return (
        <div className='CommandButton'>
            <Button
                icon='save'
                hint='Save state'
                onClick={onClick} />
            <InputBox
                title='Save as'
                visible={inputBoxVisible}
                value={stateName}
                onHiding={onHiding}
                onOkClick={onPopupOkClick} />
        </div>
    )
}

export default React.memo(SaveStateButton)
