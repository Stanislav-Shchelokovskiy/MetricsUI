import React from 'react'
import UpdateTentRepliesButton from './UpdateTribeRepliesButton'
import GoHomeButton from '../../../common/components/HomeButton'
import { ToolbarCommands } from '../../../common/components/multiset_container/Toolbar/ToolbarCommands'

function CommandPanel() {
    return (
        <ToolbarCommands>
            <UpdateTentRepliesButton />
            <GoHomeButton className='CommandButton' />
        </ToolbarCommands>
    )
}

export default React.memo(CommandPanel)
