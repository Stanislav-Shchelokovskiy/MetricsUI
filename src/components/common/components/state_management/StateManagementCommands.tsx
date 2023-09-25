import React from 'react'
import StateSelector from './StateSelector'
import SaveStateButton from './SaveStateButton'
import DropStateButton from './DropStateButton'
import ShareStateButton from './ShareStateButton'
import LocalStatesConverter from './LocalStatesConverter'


export default function StateManagementCommands() {
    return <>
        <LocalStatesConverter />
        <StateSelector />
        <SaveStateButton />
        <DropStateButton />
        <ShareStateButton />
    </>
}
