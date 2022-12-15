import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadState } from '../../LocalStorage'
import DropDownButton from 'devextreme-react/drop-down-button'
import { applyState, changeState } from '../../store/state/Actions'
import getStorageItemKey from './Utils'
import { ValuesProps } from './Interfaces'

export default function StateSelector(props: ValuesProps) {
    const values = useSelector(props.valuesSelector)
    const dispatch = useDispatch()
    const onValueChange = ({ itemData }: { itemData: string } | any) => {
        const state = loadState(getStorageItemKey(props.state_salt, itemData))
        if (!state)
            return
        dispatch(applyState(state))
        dispatch(changeState(itemData))
    }

    return <DropDownButton
        className={props.className}
        dataSource={values}
        onItemClick={onValueChange}
        focusStateEnabled={false}
        text='Apply state'
        icon='preferences'
    />
}
