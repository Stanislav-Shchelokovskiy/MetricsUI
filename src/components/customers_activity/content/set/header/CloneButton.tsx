import React, { useCallback } from 'react'
import { Button } from 'devextreme-react/button'
import { useAppDispatch } from '../../../../common/AppStore'
import { addSet } from '../../../store/Actions'


export default function CloneButton({ setTitle }: { setTitle: string }) {
    const dispatch = useAppDispatch()
    const onClick = useCallback(() => {
        dispatch(addSet(setTitle))
    }, [setTitle, dispatch])

    return (
        <Button
            className='SetHeaderButton'
            text='Clone set'
            // render={}
            // disabled={}
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
            onClick={onClick}
        />
    )
}
