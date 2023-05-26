import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../Button'
import { removeSet } from '../../../../store/multiset_container/Actions'


export default function DropButton({ setTitle }: { setTitle: string }) {
    const dispatch = useDispatch()
    const onClick = useCallback(() => {
        dispatch(removeSet(setTitle))
    }, [setTitle, dispatch])

    return <Button
        className='SetHeaderButton'
        hint='Drop'
        icon='remove'
        stylingMode='text'
        onClick={onClick}
    />
}