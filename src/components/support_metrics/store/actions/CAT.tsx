import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_REPLIES_TYPES = 'customers_activity/change_replies_types'
export const changeRepliesTypes = getValuesPayloadAction<string>(CHANGE_REPLIES_TYPES)

export const CHANGE_REPLIES_TYPES_INCLUDE = 'customers_activity/change_replies_types_include'
export const changeRepliesTypesInclude = getIncludePayloadAction(CHANGE_REPLIES_TYPES_INCLUDE)


export const CHANGE_COMPONENTS = 'customers_activity/change_components'
export const changeComponents = getValuesPayloadAction<string>(CHANGE_COMPONENTS)

export const CHANGE_COMPONENTS_INCLUDE = 'customers_activity/change_components_include'
export const changeComponentsInclude = getIncludePayloadAction(CHANGE_COMPONENTS_INCLUDE)


export const CHANGE_FEATURES = 'customers_activity/change_features'
export const changeFeatures = getValuesPayloadAction<string>(CHANGE_FEATURES)

export const CHANGE_FEATURES_INCLUDE = 'customers_activity/change_features_include'
export const changeFeaturesInclude = getIncludePayloadAction(CHANGE_FEATURES_INCLUDE)
