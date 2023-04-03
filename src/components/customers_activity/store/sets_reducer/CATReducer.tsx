import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState, updateValues, updateInclude } from './Utils'
import { Set } from './Interfaces'
import {
    CHANGE_REPLIES_TYPES,
    CHANGE_REPLIES_TYPES_INCLUDE,
    CHANGE_COMPONENTS,
    CHANGE_COMPONENTS_INCLUDE,
    CHANGE_FEATURES,
    CHANGE_FEATURES_INCLUDE,
} from '../actions/CAT'


export function catReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
    switch (action.type) {

        case CHANGE_REPLIES_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    repliesTypes: updateValues(x.repliesTypes, action.payload.data)
                }
            })
        case CHANGE_REPLIES_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    repliesTypes: updateInclude(x.repliesTypes, action.payload.data)
                }
            })


        case CHANGE_COMPONENTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    components: updateValues(x.components, action.payload.data)
                }
            })
        case CHANGE_COMPONENTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    components: updateInclude(x.components, action.payload.data)
                }
            })


        case CHANGE_FEATURES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    features: updateValues(x.features, action.payload.data)
                }
            })
        case CHANGE_FEATURES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    features: updateInclude(x.features, action.payload.data)
                }
            })


        default:
            return sets
    }
}