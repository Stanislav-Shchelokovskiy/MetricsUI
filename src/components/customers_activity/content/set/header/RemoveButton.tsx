import React, { useRef, useCallback } from 'react'
import { Button } from 'devextreme-react/button'
import { AppStore, useAppDispatch, useAppSelector } from '../../../../common/AppStore'
import { removeSet } from '../../../store/Actions'


export default function RemoveButton({ title }: { title: string }) {
    const renderCount = useRef(0)
    console.log(title, ' RemoveButton render ', renderCount.current++)

    const dispatch = useAppDispatch()
    const onClick = useCallback(() => {
        dispatch(removeSet(title))
    }, [title, dispatch])

    const disabled: boolean = useAppSelector((state: AppStore) => state.customersActivity.sets).length === 1
    return (
        <Button
            className='SetHeaderButton'
            text='Remove set'
            // render={}
            disabled={disabled}
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
            onClick={onClick}
        />
    )
}
