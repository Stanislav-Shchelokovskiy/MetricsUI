import React from 'react'
import UpdateTentRepliesButton from './UpdateTribeRepliesButton'
import GoHomeButton from '../../../common/components/GoHomeButton'
import ToolbarCommands from '../../../common/components/multiset_container/Toolbar/ToolbarCommands'


function CommandPanel() {
    return (
        <ToolbarCommands>
            <UpdateTentRepliesButton />
            <GoHomeButton />
        </ToolbarCommands>
    )
}

export default React.memo(CommandPanel)
