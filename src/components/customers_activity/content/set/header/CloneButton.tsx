import React from 'react'
import { Button } from 'devextreme-react/button'
import { useAppDispatch } from '../../../../common/AppStore'
import { addSet } from '../../../store/Actions'


export default function CloneButton({ setTitle }: { setTitle: string }) {
    const dispatch = useAppDispatch()
    const onClick = () => {
        dispatch(addSet(setTitle))
    }

    return (
        <Button
            className='SetHeaderButton'
            text='Clone set'
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
            onClick={onClick}
        />
    )
}
