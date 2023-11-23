import React, { useCallback, useState, useRef, PropsWithChildren, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup, ToolbarItem } from 'devextreme-react/popup'
import Button from '../../Button'
import { CheckBox } from 'devextreme-react/check-box'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { changeDisablePeriodExtension } from '../../../store/multiset_container/Actions'
import { PopupProps } from '../../../Typing'
import { disablePeriodExtensionSelector } from '../../../store/multiset_container/Selectors'
import { useMultisetContainerContext } from '../MultisetContainerContext'


interface LazyDispatch {
    dispatch: () => void
}

export interface SettingsProps {
    dispatchRef: React.RefObject<LazyDispatch>
}

interface CustomSettingsProps {
    customSettings: FC<SettingsProps> | null
}

export interface AdvancedSettingsProps extends CustomSettingsProps {
    visible: boolean
}

export default function AdvancedSettingsButton(props: PropsWithChildren<AdvancedSettingsProps>) {
    const [popupVisible, setPopupVisible] = useState(false)

    const onClick = () => setPopupVisible(true)
    const onHiding = useCallback(() => {
        setPopupVisible(false)
    }, [])

    const context = useMultisetContainerContext()
    const settingsModified = context.advancedSettings.modified(context.stateManagement.getShareableState())

    if (props.visible) {
        return (
            <div className='CommandButton'>
                <Button
                    icon='preferences'
                    hint={"Sets' advanced settings" + (settingsModified ? ' (modified)' : '')}
                    onClick={onClick}
                    type={settingsModified ? 'default' : 'normal'} />
                <AdvancedSettingsPopup
                    customSettings={props.customSettings}
                    visible={popupVisible}
                    onHiding={onHiding} />
            </div>
        )
    }
    return null
}


interface SettingsPopupProps extends PopupProps, CustomSettingsProps { }

function lazyDispatch() {
    return { dispatch: () => { } }
}

function AdvancedSettingsPopup(props: SettingsPopupProps) {
    const childrenRef = useRef<LazyDispatch>(lazyDispatch())

    const disablePeriodExtensionRef = useRef<CheckBox>(null)
    const disablePeriodExtension = useSelector<MultisetContainerStore, boolean>(disablePeriodExtensionSelector)

    const dispatch = useDispatch()
    const onOkClick = useCallback(() => {
        const newVal = !!disablePeriodExtensionRef.current?.instance.option('value')
        if (newVal !== disablePeriodExtension) {
            dispatch(changeDisablePeriodExtension(newVal))
        }
        childrenRef.current?.dispatch()
        props.onHiding()
    }, [disablePeriodExtension])

    const okButtonOptions = {
        text: 'Ok',
        type: 'normal',
        stylingMode: 'outlined',
        focusStateEnabled: false,
        onClick: onOkClick,
    }
    return (
        <Popup
            visible={props.visible}
            onHiding={props.onHiding}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={true}
            showTitle={true}
            title='Advanced Settings'
            maxWidth='30vw'
            maxHeight='40vh'
        >
            <div className='AdvancedSettings'>
                <CheckBox
                    ref={disablePeriodExtensionRef}
                    text='Disable automatic period extension'
                    focusStateEnabled={false}
                    defaultValue={disablePeriodExtension}
                />
                {
                    props.customSettings ? <props.customSettings dispatchRef={childrenRef} /> : null
                }
            </div>
            <ToolbarItem
                widget='dxButton'
                toolbar='bottom'
                location='after'
                options={okButtonOptions}
            />
        </Popup>
    )
}
