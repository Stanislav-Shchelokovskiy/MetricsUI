import React from 'react'
import CloneButton from './CloneButton'
import RemoveButton from './RemoveButton'
import Title from './Title'


export default function SetHeader({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomerActivity_SetHeader'>
            <Title setTitle={setTitle} />
            <CloneButton setTitle={setTitle} />
            <RemoveButton setTitle={setTitle} />
        </div>
    )
}
