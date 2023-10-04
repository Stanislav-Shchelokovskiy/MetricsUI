import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState } from './BaseContainerState'
import { generateSetTitle } from './Utils'
import { getDefaultTitle } from './sets/Defaults'
import { getViewStateReducer } from './ViewStateReducer'
import {
    ADD_SET,
    REMOVE_SET,
    REMOVE_ALL_SETS,
    CHANGE_SET_TITLE,
    HIDE_LEGENDS,
    CHANGE_PERIOD,
    CHANGE_GROUP_BY,
    CHANGE_METRIC,
    CHANGE_COMPARISON_METHOD,
} from './Actions'

export function getContainerReducer<ContainerStateT extends BaseContainerState>(
    initialState: ContainerStateT,
    containerValidator: (container: ContainerStateT) => ContainerStateT
): (state: ContainerStateT, action: PayloadAction<any>) => ContainerStateT {

    const setsCRUDReducer = getSetsCRUDReducer<ContainerStateT>(initialState)
    const comparisonGraphReducer = getComparisonGraphReducer<ContainerStateT>(initialState)
    const viewStateReducer = getViewStateReducer<ContainerStateT>(containerValidator, (state) => state.container as ContainerStateT)

    return (state: ContainerStateT = initialState, action: PayloadAction<any>): ContainerStateT => {
        let res = setsCRUDReducer(state, action)
        res = comparisonGraphReducer(res, action)
        return viewStateReducer(res, action)
    }
}

function getSetsCRUDReducer<ContainerStateT extends BaseContainerState>(initialState: ContainerStateT): (container: ContainerStateT, action: PayloadAction<any>) => ContainerStateT {
    return (container: ContainerStateT, action: PayloadAction<any>) => {
        switch (action.type) {
            case ADD_SET:
                return {
                    ...container,
                    sets: [...container.sets, generateSetTitle(container.sets, action.payload)]
                }

            case REMOVE_SET:
                const removeSelector = (x: string) => x !== action.payload
                const restSets = container.sets.filter(removeSelector)
                return {
                    ...container,
                    sets: restSets.length ? restSets : [getDefaultTitle()],
                    hiddenLegends: container.hiddenLegends.filter(removeSelector)
                }

            case REMOVE_ALL_SETS:
                return {
                    ...container,
                    sets: [getDefaultTitle()]
                }

            case CHANGE_SET_TITLE:
                const setTitle = generateSetTitle(container.sets, action.payload.data)
                const replaceSelector = (x: string) => x !== action.payload.stateId ? x : setTitle
                return {
                    ...container,
                    sets: container.sets.map(replaceSelector),
                    hiddenLegends: container.hiddenLegends.map(replaceSelector)
                }

            default:
                if (container.sets.length === 0) {
                    return {
                        ...container,
                        sets: initialState.sets
                    }
                }
                return container
        }
    }
}

function getComparisonGraphReducer<ContainerStateT extends BaseContainerState>(initialState: ContainerStateT): (container: ContainerStateT, action: PayloadAction<any>) => ContainerStateT {
    return (container: ContainerStateT, action: PayloadAction<any>) => {
        switch (action.type) {

            case CHANGE_PERIOD:
                return {
                    ...container,
                    range: action.payload
                }

            case CHANGE_GROUP_BY:
                return {
                    ...container,
                    groupBy: action.payload !== undefined ? action.payload : initialState.groupBy
                }

            case CHANGE_METRIC:
                return {
                    ...container,
                    metric: action.payload !== undefined ? action.payload : initialState.metric
                }

            case CHANGE_COMPARISON_METHOD:
                return {
                    ...container,
                    comparisonMethod: action.payload !== undefined ? action.payload : initialState.comparisonMethod
                }

            case HIDE_LEGENDS:
                return {
                    ...container,
                    hiddenLegends: action.payload
                }

            default:
                return container
        }
    }
}
