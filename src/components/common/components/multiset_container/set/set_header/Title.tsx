import React, { useState, useCallback } from 'react'
import Button from '../../../Button'
import InputBox from '../../../InputBox'
import { useDispatch } from 'react-redux'
import { changeSetTitle } from '../../../../store/multiset_container/Actions'
import { useSetTitle } from '../SetContext'


export default function Title() {
    const setTitle = useSetTitle()
    return (
        <div className='SetHeaderTitle'>
            {setTitle}
            <RenameButton setTitle={setTitle} />
        </div>)
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
                value={setTitle}
                onHiding={onHiding}
                onOkClick={onPopupOkClick} />
        </React.Fragment>
    )
}
