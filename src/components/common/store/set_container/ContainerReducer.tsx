import { AnyAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../state/Actions'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
    HIDE_LEGENDS,
} from './Actions'

import { BaseContainerState } from './Interfaces'
import { generateNewSetTitle } from './sets/Utils'
import { getDefaultTitle } from './sets/Defaults'

export function getSetsReducer<ContainerState extends BaseContainerState>(initial_state: ContainerState): (state: ContainerState, action: AnyAction) => ContainerState {
    return (state: ContainerState, action: AnyAction) => {
        switch (action.type) {
            case ADD_SET:
                return {
                    ...state,
                    sets: [...state.sets, generateNewSetTitle(state.sets)]
                }

            case REMOVE_SET:
                const remove_selector = (x: string) => x !== action.payload
                return {
                    ...state,
                    sets: state.sets.length < 2 ? [getDefaultTitle()] : state.sets.filter(remove_selector),
                    hiddenLegends: state.hiddenLegends.filter(remove_selector)
                }

            case CHANGE_SET_TITLE:
                const replace_selector = (x: string) => x !== action.payload.stateId ? x : action.payload.data
                return {
                    ...state,
                    sets: state.sets.map(replace_selector),
                    hiddenLegends: state.hiddenLegends.map(replace_selector)
                }

            default:
                if (state.sets.length === 0) {
                    return {
                        ...state,
                        sets: initial_state.sets
                    }
                }
                return state
        }
    }
}

export function getHiddenLegendsReducer<ContainerState extends BaseContainerState>(): (state: ContainerState, action: AnyAction) => ContainerState {
    return (state: ContainerState, action: AnyAction) => {
        switch (action.type) {

            case HIDE_LEGENDS:
                return {
                    ...state,
                    hiddenLegends: action.payload
                }

            default:
                return state
        }
    }
}

export function getStateReducer<ContainerState extends BaseContainerState>(stateValidator: (container: ContainerState) => ContainerState): (container: ContainerState, action: AnyAction) => ContainerState {
    return (container: ContainerState, action: AnyAction) => {
        switch (action.type) {

            case APPLY_STATE:
                return stateValidator(action.payload.customersActivity)

            default:
                return container
        }
    }
}
