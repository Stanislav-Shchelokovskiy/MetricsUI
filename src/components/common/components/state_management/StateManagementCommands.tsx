import React from 'react'
import StateSelector from './StateSelector'
import SaveStateButton from './SaveStateButton'
import DropStateButton from './DropStateButton'
import ShareStateButton from './ShareStateButton'




export default function StateManagementCommands() {
    return <React.Fragment>
        <StateSelector />
        <SaveStateButton />
        <DropStateButton />
        <ShareStateButton />
    </React.Fragment>
}


