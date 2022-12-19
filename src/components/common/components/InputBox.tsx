import React, { useCallback, useRef } from 'react'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import TextBox from 'devextreme-react/text-box'

interface InputBoxProps {
    title: string
    visible: boolean
    value: string
    onHiding: () => void
    onOkClick: (value: string | undefined) => void
}

export default function InputBox(props: InputBoxProps) {
    const inputRef = useRef<TextBox>(null)
    inputRef.current?.instance.option('value', props.value)

    const onOk = useCallback(() => {
        props.onOkClick(inputRef.current?.instance.option('value'))
    }, [])

    const closeButtonOptions = {
        text: 'Ok',
        type: 'normal',
        stylingMode: 'outlined',
        focusStateEnabled: false,
        onClick: onOk,
    }

    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title={props.title}
            maxWidth='30vw'
            maxHeight='25vh'
        >
            <TextBox ref={inputRef} defaultValue={props.value} valueChangeEvent='keyup' onEnterKey={onOk} />
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={closeButtonOptions}
            />
        </Popup>
    )
}