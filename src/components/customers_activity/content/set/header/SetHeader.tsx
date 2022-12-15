import React from 'react'
import CloneButton from './CloneButton'
import DropButton from './DropButton'
import Title from './Title'


export default function SetHeader({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomerActivity_SetHeader'>
            <Title setTitle={setTitle} />
            <CloneButton setTitle={setTitle} />
            <DropButton setTitle={setTitle} />
        </div>
    )
}
