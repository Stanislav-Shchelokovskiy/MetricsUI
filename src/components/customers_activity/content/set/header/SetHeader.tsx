import React from 'react'
import Title from './Title'
import CloneButton from './CloneButton'
import RemoveButton from './RemoveButton'
import CatPanel from '../cat_panel/CatPanel'


export default function SetHeader({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomerActivity_SetHeader'>
            <Title setTitle={setTitle} />
            <CloneButton setTitle={setTitle} />
            <RemoveButton setTitle={setTitle} />
            <CatPanel setTitle={setTitle} />
        </div>
    )
}
