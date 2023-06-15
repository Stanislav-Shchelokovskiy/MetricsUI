import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadState } from '../../LocalStorage'
import DropDownButton from 'devextreme-react/drop-down-button'
import { applyState, changeState } from '../../store/view_state/Actions'
import getStorageItemKey from './Utils'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'
import { stateNamesSelector } from '../../store/view_state/Selectors'

export default function StateSelector() {
    const context = useMultisetContainerContext()
    const stateNames = useSelector(stateNamesSelector)
    const dispatch = useDispatch()
    const onValueChange = ({ itemData }: { itemData: string } | any) => {
        const state = loadState(getStorageItemKey(context.stateManagement.stateSalt, itemData))
        if (!state)
            return
        dispatch(applyState(state))
        dispatch(changeState(itemData))
    }

    return <DropDownButton
        className='CommandButton'
        dataSource={stateNames}
        onItemClick={onValueChange}
        focusStateEnabled={false}
        text='Apply state'
        icon='favorites'
    />
}
