import React from 'react'
import { Button } from 'devextreme-react/button'

export default function CloneButton() {
    return (
        <Button
            width={150}
            height={40}
            text='Clone set'
            // render={}
            // disabled={}
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
        //onClick={onClick} 
        />
    )
}