import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../Button'
import { removeSet } from '../../../../store/multiset_container/Actions'
import { useSetTitle } from '../SetContext'


export default function DropButton() {
    const setTitle = useSetTitle()

    const dispatch = useDispatch()
    const onClick = () => dispatch(removeSet(setTitle))

    return <Button
        className='SetHeaderButton'
        hint='Drop'
        icon='remove'
        stylingMode='text'
        onClick={onClick}
    />
}
