import React, { useState, useCallback } from 'react'
import Button from '../../../Button'
import InputBox from '../../../InputBox'
import { useDispatch } from 'react-redux'
import { changeSetTitle } from '../../../../../customers_activity/store/actions/Common'


export default function Title({ setTitle }: { setTitle: string }) {
    return (
        <div className='SetHeaderTitle'>
            {toFriendlyTitle(setTitle)}
            <RenameButton setTitle={setTitle} />
        </div>)
}

export function toFriendlyTitle(title: string) {
    if (isNaN(parseFloat(title)))
        return title
    return `Set ${title}`
}


function RenameButton({ setTitle }: { setTitle: string }) {
    const [inputBoxVisible, setInputBoxVisible] = useState(false)

    const onClick = () => setInputBoxVisible(true)
    const onHiding = useCallback(() => {
        setInputBoxVisible(false)
    }, [])

    const dispatch = useDispatch()
    const onPopupOkClick = (value: string | undefined) => {
        if (value)
            dispatch(changeSetTitle({ stateId: setTitle, data: value }))
        onHiding()
    }
    return (
        <React.Fragment>
            <Button
                className='SetHeaderRenameButton'
                hint='Rename'
                icon='rename'
                stylingMode='text'
                onClick={onClick}
            />
            <InputBox
                title='New name'
                visible={inputBoxVisible}
                value={toFriendlyTitle(setTitle)}
                onHiding={onHiding}
                onOkClick={onPopupOkClick} />
        </React.Fragment>
    )
}
