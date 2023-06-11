import React from 'react'
import CloneButton from './CloneButton'
import DropButton from './DropButton'
import Title from './Title'


export default function SetHeader() {
    return (
        <div className='SetHeader'>
            <Title />
            <CloneButton />
            <DropButton />
        </div>
    )
}
