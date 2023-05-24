import { AnyAction } from '@reduxjs/toolkit'
import { CostMetricsShareableState } from './Store'
import { BaseContainerState } from '../../common/store/set_container/Interfaces'
import { getDefaultTitle } from '../../common/store/set_container/sets/Defaults'
import { getHiddenLegendsReducer, getSetsCRUDReducer } from '../../common/store/set_container/ContainerReducer'
import { getViewStateReducer } from '../../common/store/set_container/ViewStateReducer'
import { containerValidator } from './StoreStateValidator'


export interface Container extends BaseContainerState { }

const INITIAL_CONTAINER_STATE: Container = {
    sets: [getDefaultTitle()],
    hiddenLegends: Array<string>()
}

export const ContainerReducer = (state: Container = INITIAL_CONTAINER_STATE, action: AnyAction): Container => {
    let res = setsCRUDReducer(state, action)
    res = hiddenLegendsReducer(res, action)
    res = viewStateReducer(res, action)
    return costMetricsReducer(res, action)
}

const setsCRUDReducer = getSetsCRUDReducer<Container>(INITIAL_CONTAINER_STATE)
const hiddenLegendsReducer = getHiddenLegendsReducer<Container>()
const viewStateReducer = getViewStateReducer<Container, CostMetricsShareableState>(containerValidator)



function costMetricsReducer(state: Container, action: AnyAction): Container {
    return state
}
