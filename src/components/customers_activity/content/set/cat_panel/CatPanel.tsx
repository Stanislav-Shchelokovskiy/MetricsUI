import React from 'react'
import ReplyTypesSelector from './ReplyTypesSelector'
import ControlsSelector from './ControlsSelector'
import FeaturesSelector from './FeaturesSelector'


function CatPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_CatPanel'>
            <ReplyTypesSelector setTitle={setTitle} />
            <ControlsSelector setTitle={setTitle} />
            <FeaturesSelector setTitle={setTitle} />
        </div>
    )
}

export default React.memo(CatPanel)
