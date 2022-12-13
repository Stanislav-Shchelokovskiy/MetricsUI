import React, { useCallback } from 'react'
import Button from '../../../../common/components/Button'
import { CustomersActivityStore, useCustomersActivityDispatch, useCustomersActivitySelector } from '../../../store/Store'
import { removeSet } from '../../../store/Actions'


export default function RemoveButton({ setTitle }: { setTitle: string }) {
    const dispatch = useCustomersActivityDispatch()
    const onClick = useCallback(() => {
        dispatch(removeSet(setTitle))
    }, [setTitle, dispatch])

    const disabled: boolean = useCustomersActivitySelector((state: CustomersActivityStore) => state.customersActivity.sets).length === 1
    return <Button
        className='SetHeaderButton'
        text='Remove set'
        disabled={disabled}
        onClick={onClick}
    />
}
