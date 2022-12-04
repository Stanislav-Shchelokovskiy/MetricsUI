import React from 'react'
import ReplyTypesSelector from './ReplyTypesSelector'


function CatPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_CatPanel'>
            <ReplyTypesSelector setTitle={setTitle} />
        </div>
    )
}

export default React.memo(CatPanel)
