import React from 'react'
import { Button } from 'devextreme-react/button'

export default function ApplyButton({ title }: { title: string }) {
    return (
        <Button
            className='CustomersActivity_ApplyButton'
            text='Apply'
            // render={}
            // disabled={}
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
        //onClick={onClick} 
        />
    )
}
