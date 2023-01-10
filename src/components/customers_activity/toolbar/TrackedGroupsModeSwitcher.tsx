import React from 'react'
import { CheckBox } from 'devextreme-react/check-box'
import { useDispatch, useSelector } from 'react-redux'
import { CustomersActivityStore } from '../store/Store'
import { changeTrackedCustomersGroupsMode } from '../store/Actions'



export default function TrackedGroupsModeSwitcher({ visible }: { visible: boolean }) {
    const appDispatch = useDispatch()
    const onValueChangeHandler = (value: boolean) => {
        appDispatch(changeTrackedCustomersGroupsMode(value))
    }

    const value = useSelector((store: CustomersActivityStore) => store.customersActivity.trackedCustomersGroupsModeEnabled)
    return <CheckBox
        className='CustomersActivity_TrackedGroupsModeSwitcher'
        text='Tracked Users Groups Mode'
        focusStateEnabled={false}
        visible={visible}
        defaultValue={value}
        onValueChange={onValueChangeHandler}
    />
}
