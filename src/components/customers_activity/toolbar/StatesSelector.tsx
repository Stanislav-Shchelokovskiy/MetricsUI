import React from 'react'
import DropDownButton from 'devextreme-react/drop-down-button'
import { applyState, changeStateKey } from '../store/Actions'
import { loadState } from '../../common/LocalStorage'
import { useCustomersActivityDispatch, useCustomersActivitySelector, CustomersActivityStore } from '../store/Store'


export default function StatesSelector() {
    const viewState = useCustomersActivitySelector((state: CustomersActivityStore) => state.viewState)
    const dispatch = useCustomersActivityDispatch()
    const onValueChange = ({ itemData }: { itemData: string } | any) => {
        const state = loadState(itemData)
        if (!state)
            return
        dispatch(applyState(state))
        dispatch(changeStateKey(itemData))
    }

    return <DropDownButton
        className='CustomersActivityViewStatesSelector'
        dataSource={viewState.stateKeys}
        onItemClick={onValueChange}
        focusStateEnabled={false}
        text='Apply state'
        icon='preferences'
    />
}