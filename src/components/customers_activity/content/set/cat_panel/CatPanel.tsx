import React from 'react'
import ReplyTypesSelector from './ReplyTypesSelector'
import ComponentsSelector from './ComponentsSelector'
import FeaturesSelector from './FeaturesSelector'


export default function CatPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_CatPanel'>
            <ReplyTypesSelector setTitle={setTitle} />
            <ComponentsSelector setTitle={setTitle} />
            <FeaturesSelector setTitle={setTitle} />
        </div>
    )
}
