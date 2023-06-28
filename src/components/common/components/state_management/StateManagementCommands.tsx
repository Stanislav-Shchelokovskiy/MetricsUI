import React from 'react'
import { Provider } from 'react-redux'
import StateSelector from './StateSelector'
import SaveStateButton from './SaveStateButton'
import DropStateButton from './DropStateButton'
import ShareStateButton from './ShareStateButton'
import { viewStore } from '../../store/view_state/Store'


export default function StateManagementCommands() {
    return <Provider store={viewStore}>
        <StateSelector />
        <SaveStateButton />
        <DropStateButton />
        <ShareStateButton />
    </Provider>
}
