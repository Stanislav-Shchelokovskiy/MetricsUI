import React from 'react'
import UpdateTribeRepliesButton from './UpdateTribeRepliesButton'
import GoHomeButton from '../../../common/components/HomeButton'


function CommandPanel() {
    return (
        <div className='ForecasterCommandPanel'>
            <UpdateTribeRepliesButton />
            <GoHomeButton className='ForecasterGoHomeButton' />
        </div>
    )
}

export default React.memo(CommandPanel)
