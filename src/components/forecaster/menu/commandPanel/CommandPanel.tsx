import React from 'react'
import UpdateTentRepliesButton from './UpdateTribeRepliesButton'
import GoHomeButton from '../../../common/components/GoHomeButton'
import SignOutButton from '../../../common/ms_id/SignOutButton'
import ToolbarCommands from '../../../common/components/multiset_container/Toolbar/ToolbarCommands'


function CommandPanel() {
    return (
        <ToolbarCommands>
            <UpdateTentRepliesButton />
            <GoHomeButton />
            <div><SignOutButton /></div>
        </ToolbarCommands>
    )
}

export default React.memo(CommandPanel)
