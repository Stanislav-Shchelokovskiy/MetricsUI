import React from 'react'
import UpdateTentRepliesButton from './UpdateTribeRepliesButton'
import GoHomeButton from '../../../common/components/HomeButton'


function CommandPanel() {
    return (
        <div className='ForecasterCommandPanel'>
            <UpdateTentRepliesButton />
            <GoHomeButton className='ForecasterGoHomeButton' />
        </div>
    )
}

export default React.memo(CommandPanel)
