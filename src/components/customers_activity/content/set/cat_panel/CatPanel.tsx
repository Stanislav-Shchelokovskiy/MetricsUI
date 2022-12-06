import React from 'react'
import ReplyTypesSelector from './ReplyTypesSelector'
import ControlsSelector from './ControlsSelector'


function CatPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_CatPanel'>
            <ReplyTypesSelector setTitle={setTitle} />
            <ControlsSelector setTitle={setTitle} />
        </div>
    )
}

export default React.memo(CatPanel)
