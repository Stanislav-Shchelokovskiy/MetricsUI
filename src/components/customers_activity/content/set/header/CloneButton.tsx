import React, { useCallback, useRef } from 'react'
import { Button } from 'devextreme-react/button'
import { useAppDispatch } from '../../../../common/AppStore'
import { addSet } from '../../../store/Actions'

export default function CloneButton({ title }: { title: string }) {
    const renderCount = useRef(0)
    console.log(title, ' CloneButton render ', renderCount.current++)

    const dispatch = useAppDispatch()
    const onClick = useCallback(() => {
        dispatch(addSet(title))
    }, [title, dispatch])

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