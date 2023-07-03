import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadState } from '../../LocalStorage'
import DropDownButton from 'devextreme-react/drop-down-button'
import { changeState } from '../../store/view_state/Actions'
import getStorageItemKey from './Utils'
import { stateNamesSelector, saltSelector } from '../../store/view_state/Selectors'
import { useMultisetContainerContext } from '../multiset_container/MultisetContainerContext'

export default function StateSelector() {
    const context = useMultisetContainerContext()
    const stateNames = useSelector(stateNamesSelector)
    const salt = useSelector(saltSelector)
    const [stateName, dispatchStateName] = useState<string>('')
    const dispatch = useDispatch()
    const onValueChange = ({ itemData: stateName }: { itemData: string } | any) => {
        dispatch(changeState(stateName))
        dispatchStateName(stateName)
    }

    useEffect(() => {
        if (stateName) {
            const state = loadState(getStorageItemKey(salt, stateName))
            if (state)
                context.changeState(state)
        }
    }, [stateName])

    return <DropDownButton
        className='CommandButton'
        dataSource={stateNames}
        onItemClick={onValueChange}
        focusStateEnabled={false}
        text='Apply state'
        icon='favorites'
    />
}
