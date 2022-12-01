import React from 'react'
import ReplyTypesSelector from './ReplyTypesSelector'


function CatPanel({ title }: { title: string }) {
    return (
        <div className='CustomersActivity_CatPanel'>
            <ReplyTypesSelector title={title} />
        </div>
    )
}

export default React.memo(CatPanel)
