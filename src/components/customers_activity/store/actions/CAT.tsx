import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_REPLIES_TYPES = 'customers_activity/change_replies_types'
export const changeRepliesTypes = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_REPLIES_TYPES,
        payload: payload
    }
}

export const CHANGE_REPLIES_TYPES_INCLUDE = 'customers_activity/change_replies_types_include'
export const changeRepliesTypesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_REPLIES_TYPES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_COMPONENTS = 'customers_activity/change_components'
export const changeComponents = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_COMPONENTS,
        payload: payload
    }
}

export const CHANGE_COMPONENTS_INCLUDE = 'customers_activity/change_components_include'
export const changeComponentsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_COMPONENTS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_FEATURES = 'customers_activity/change_features'
export const changeFeatures = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_FEATURES,
        payload: payload
    }
}

export const CHANGE_FEATURES_INCLUDE = 'customers_activity/change_features_include'
export const changeFeaturesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_FEATURES_INCLUDE,
        payload: payload
    }
}
