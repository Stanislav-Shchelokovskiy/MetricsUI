import React from 'react'
import UpdateTribeRepliesButton from './UpdateTribeRepliesButton'


function CommandPanel() {
    return (
        <div className='ForecasterCommandPanel'>
            <UpdateTribeRepliesButton />
        </div>
    )
}

export default React.memo(CommandPanel)
