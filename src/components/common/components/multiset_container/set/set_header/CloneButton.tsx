import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../Button'
import { addSet } from '../../../../store/multiset_container/Actions'
import { useSetTitle } from '../SetContext'


export default function CloneButton() {
    const setTitle = useSetTitle()
    
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(addSet(setTitle))
    }

    return <Button
        className='SetHeaderButton'
        icon='copy'
        hint='Clone'
        stylingMode='text'
        onClick={onClick}
    />
}
