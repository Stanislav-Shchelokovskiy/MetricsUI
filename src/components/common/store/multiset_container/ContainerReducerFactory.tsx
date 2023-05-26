import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState } from './Interfaces'
import { generateSetTitle } from './sets/Utils'
import { getDefaultTitle } from './sets/Defaults'
import { getViewStateReducer } from './ViewStateReducer'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
    HIDE_LEGENDS,
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
    CHANGE_COMPARISON_METHOD,
} from './Actions'

export function getContainerReducer<ContainerStateT extends BaseContainerState, ShareableStateT>(
    initialState: ContainerStateT,
    stateValidator: (state: ShareableStateT) => ContainerStateT
): (state: ContainerStateT, action: PayloadAction<any>) => ContainerStateT {

    const setsCRUDReducer = getSetsCRUDReducer<ContainerStateT>(initialState)
    const comparisonGraphReducer = getComparisonGraphReducer<ContainerStateT>(initialState)
    const viewStateReducer = getViewStateReducer<ContainerStateT, ShareableStateT>(stateValidator)

    return (state: ContainerStateT = initialState, action: PayloadAction<any>): ContainerStateT => {
        let res = setsCRUDReducer(state, action)
        res = comparisonGraphReducer(res, action)
        return viewStateReducer(res, action)
    }
}

function getSetsCRUDReducer<ContainerStateT extends BaseContainerState>(initialState: ContainerStateT): (state: ContainerStateT, action: PayloadAction<any>) => ContainerStateT {
    return (state: ContainerStateT, action: PayloadAction<any>) => {
        switch (action.type) {
            case ADD_SET:
                return {
                    ...state,
                    sets: [...state.sets, generateSetTitle(state.sets, action.payload)]
                }

            case REMOVE_SET:
                const remove_selector = (x: string) => x !== action.payload
                const restSets = state.sets.filter(remove_selector)
                return {
                    ...state,
                    sets: restSets.length ? restSets : [getDefaultTitle()],
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
                        sets: initialState.sets
                    }
                }
                return state
        }
    }
}

function getComparisonGraphReducer<ContainerStateT extends BaseContainerState>(initialState: ContainerStateT): (state: ContainerStateT, action: PayloadAction<any>) => ContainerStateT {
    return (state: ContainerStateT, action: PayloadAction<any>) => {
        switch (action.type) {

            case CHANGE_PERIOD:
                return {
                    ...state,
                    range: action.payload
                }

            case CHANGE_GROUP_BY_PERIOD:
                return {
                    ...state,
                    groupByPeriod: action.payload !== undefined ? action.payload : initialState.groupByPeriod
                }

            case CHANGE_METRIC:
                return {
                    ...state,
                    metric: action.payload !== undefined ? action.payload : initialState.metric
                }

            case CHANGE_COMPARISON_METHOD:
                return {
                    ...state,
                    comparisonMethod: action.payload !== undefined ? action.payload : initialState.comparisonMethod
                }

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
