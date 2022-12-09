import React from 'react'
import CloneButton from './CloneButton'
import RemoveButton from './RemoveButton'


export default function SetHeader({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomerActivity_SetHeader'>
            <CloneButton setTitle={setTitle} />
            <RemoveButton setTitle={setTitle} />
        </div>
    )
}
