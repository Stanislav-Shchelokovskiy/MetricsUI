import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadState } from '../../LocalStorage'
import DropDownButton from 'devextreme-react/drop-down-button'
import { changeState } from '../../store/view_state/Actions'
import getStorageItemKey from './Utils'
import { stateNamesSelector } from '../../store/view_state/Selectors'
import { useMultisetContainerContext } from '../multiset_container/MultisetContainerContext'
import { STATE_SALT } from '../../store/view_state/Store'

export default function StateSelector() {
    const context = useMultisetContainerContext()
    const stateNames = useSelector(stateNamesSelector)
    const [stateName, dispatchStateName] = useState<string>('')
    const dispatch = useDispatch()
    const onValueChange = ({ itemData: stateName }: { itemData: string } | any) => {
        dispatch(changeState(stateName))
        dispatchStateName(stateName)
    }

    useEffect(() => {
        if (stateName) {
            const state = loadState(getStorageItemKey(STATE_SALT, stateName))
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
