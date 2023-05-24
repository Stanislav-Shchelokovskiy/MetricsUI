import React from 'react'
import StateSelector from './StateSelector'
import SaveStateButton from './SaveStateButton'
import DropStateButton from './DropStateButton'
import ShareStateButton from './ShareStateButton'
import { ViewStateStore } from '../../store/state/Reducers'

interface StateManagementCommandsProps {
    className: string
    shareableStateSelector: (state: any) => any
    stateSalt: string
}

export default function StateManagementCommands(props: StateManagementCommandsProps) {
    return <React.Fragment>
        <StateSelector
            className={`${props.className}StateSelector`}
            stateNamesSelector={stateNamesSelector}
            stateSalt={props.stateSalt} />
        <SaveStateButton
            className={`${props.className}SaveStateButton`}
            stateNameSelector={stateNameSelector}
            stateSalt={props.stateSalt} />
        <DropStateButton
            className={`${props.className}DropStateButton`}
            stateNamesSelector={stateNamesSelector}
            stateSalt={props.stateSalt} />
        <ShareStateButton
            className={`${props.className}ShareStateButton`}
            statePropsSelector={props.shareableStateSelector}
            stateSalt={props.stateSalt} />
    </React.Fragment>
}

function stateNamesSelector(state: ViewStateStore) {
    return state.viewState.stateKeys
}

function stateNameSelector(state: ViewStateStore) {
    return state.viewState.key
}

const defaultProps = {
    className: 'CommandButton'
}

StateManagementCommands.defaultProps = defaultProps
