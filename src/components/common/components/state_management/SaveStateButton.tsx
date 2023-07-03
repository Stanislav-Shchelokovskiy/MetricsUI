import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveState } from '../../LocalStorage'
import InputBox from '../InputBox'
import Button from '../Button'
import { registerState } from '../../store/view_state/Actions'
import getStorageItemKey from './Utils'
import { stateNameSelector, saltSelector } from '../../store/view_state/Selectors'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'


function SaveStateButton() {
    const stateName = useSelector(stateNameSelector)
    const salt = useSelector(saltSelector)

    const [inputBoxVisible, setInputBoxVisible] = useState(false)

    const onClick = () => setInputBoxVisible(true)
    const onHiding = useCallback(() => {
        setInputBoxVisible(false)
    }, [])

    const context = useMultisetContainerContext()
    const dispatch = useDispatch()
    const onPopupOkClick = (stateName: string | undefined) => {
        if (stateName) {
            saveState(context.stateManagement.getShareableState(), getStorageItemKey(salt, stateName))
            dispatch(registerState(stateName))
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
