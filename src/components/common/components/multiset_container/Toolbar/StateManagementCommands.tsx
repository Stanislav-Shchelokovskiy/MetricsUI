import React from 'react'
import { Provider } from 'react-redux'
import ViewStateManagementCommands from '../../state_management/StateManagementCommands'
import { viewStore } from '../../../store/multiset_container/ViewStore'

export default function StateManagementCommands() {
    return <Provider store={viewStore}>
        <ViewStateManagementCommands />
    </Provider>
}
