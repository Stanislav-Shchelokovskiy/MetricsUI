import React from 'react'
import Title from './Title'
import CloneButton from './CloneButton'
import RemoveButton from './RemoveButton'

export default function SetHeader({ title }: { title: string }) {
    return (
        <div className='CustomerActivity_SetHeader'>
            <Title title={title} />
            <CloneButton title={title} />
            <RemoveButton title={title} />
        </div>
    )
}
