import React, { PropsWithChildren, } from 'react'
import SetHeader from './set_header/SetHeader'
import { SetProps } from '../MultisetContainer'
import { SetTitleContext } from './SetContext'

export default function SetWithHeader(props: PropsWithChildren<SetProps>) {
    return (
        <div className='Set' id='Set'>
            <SetTitleContext.Provider value={props.setTitle}>
                <SetHeader />
                <div className='SetSettingsPanel'>
                    {props.children}
                </div >
            </SetTitleContext.Provider>
        </div>
    )
}
