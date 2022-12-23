import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../common/components/Button'
import { CustomersActivityStore } from '../../../store/Store'
import { removeSet } from '../../../store/Actions'


export default function DropButton({ setTitle }: { setTitle: string }) {
    const dispatch = useDispatch()
    const onClick = useCallback(() => {
        dispatch(removeSet(setTitle))
    }, [setTitle, dispatch])

    const lastSet = useSelector((state: CustomersActivityStore) => state.customersActivity.sets).length === 1
    return <Button
        className='SetHeaderButton'
        hint={lastSet ? 'Reset' : 'Drop'}
        icon='remove'
        stylingMode='text'
        onClick={onClick}
    />
}
