import { AnyAction } from '@reduxjs/toolkit'
import { BaseContainerState } from './Interfaces'
import { generateSetTitle } from './sets/Utils'
import { getDefaultTitle } from './sets/Defaults'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
    HIDE_LEGENDS,
} from './Actions'

export function getSetsCRUDReducer<ContainerState extends BaseContainerState>(initial_state: ContainerState): (state: ContainerState, action: AnyAction) => ContainerState {
    return (state: ContainerState, action: AnyAction) => {
        switch (action.type) {
            case ADD_SET:
                return {
                    ...state,
                    sets: [...state.sets, generateSetTitle(state.sets)]
                }

            case REMOVE_SET:
                const remove_selector = (x: string) => x !== action.payload
                return {
                    ...state,
                    sets: state.sets.length < 2 ? [getDefaultTitle()] : state.sets.filter(remove_selector),
                    hiddenLegends: state.hiddenLegends.filter(remove_selector)
                }

            case CHANGE_SET_TITLE:
                const setTitle = generateSetTitle(state.sets, action.payload.data)
                const replace_selector = (x: string) => x !== action.payload.stateId ? x : setTitle
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
