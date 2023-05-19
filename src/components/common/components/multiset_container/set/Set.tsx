import React, { PropsWithChildren } from 'react'
import SetHeader from './set_header/SetHeader'
import { SetProps } from '../MultisetContainer'

export default function SetWithHeader(props: PropsWithChildren<SetProps>) {
    return (
        <div className='Set' id='Set'>
            <SetHeader setTitle={props.setTitle} />
            <div className='SetSettingsPanel'>
                {props.children}
            </div >
        </div>
    )
}
