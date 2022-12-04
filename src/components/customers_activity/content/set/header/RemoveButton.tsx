import React, { useCallback } from 'react'
import { Button } from 'devextreme-react/button'
import { AppStore, useAppDispatch, useAppSelector } from '../../../../common/AppStore'
import { removeSet } from '../../../store/Actions'


export default function RemoveButton({ setTitle }: { setTitle: string }) {
    const dispatch = useAppDispatch()
    const onClick = useCallback(() => {
        dispatch(removeSet(setTitle))
    }, [setTitle, dispatch])

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
