import React from 'react'
import Button from '../../../../common/components/Button'
import { useCustomersActivityDispatch } from '../../../store/Store'
import { addSet } from '../../../store/Actions'


export default function CloneButton({ setTitle }: { setTitle: string }) {
    const dispatch = useCustomersActivityDispatch()
    const onClick = () => {
        dispatch(addSet(setTitle))
    }

    return <Button
        className='SetHeaderButton'
        text='Clone set'
        onClick={onClick}
    />
}
