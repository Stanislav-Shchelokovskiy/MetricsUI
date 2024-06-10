import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_CUSTOMERS_GROUPS = 'change_customers_groups'
export const changeCustomersGroups = getValuesPayloadAction<string>(CHANGE_CUSTOMERS_GROUPS)

export const CHANGE_CUSTOMERS_GROUPS_INCLUDE = 'change_customers_groups_include'
export const changeCustomersGroupsInclude = getIncludePayloadAction(CHANGE_CUSTOMERS_GROUPS_INCLUDE)


export const CHANGE_CUSTOMERS_TYPES = 'change_customers_types'
export const changeCustomersTypes = getValuesPayloadAction<number>(CHANGE_CUSTOMERS_TYPES)

export const CHANGE_CUSTOMERS_TYPES_INCLUDE = 'change_customers_types_include'
export const changeCustomersTypesInclude = getIncludePayloadAction(CHANGE_CUSTOMERS_TYPES_INCLUDE)


export const CHANGE_CONVERSIONS_TYPES = 'change_conversions_types'
export const changeConversionsTypes = getValuesPayloadAction<number>(CHANGE_CONVERSIONS_TYPES)

export const CHANGE_CONVERSIONS_TYPES_INCLUDE = 'change_conversions_types_include'
export const changeConversionsTypesInclude = getIncludePayloadAction(CHANGE_CONVERSIONS_TYPES_INCLUDE)


export const CHANGE_CUSTOMERS = 'change_customers'
export const changeCustomers = getValuesPayloadAction<string>(CHANGE_CUSTOMERS)

export const CHANGE_CUSTOMERS_INCLUDE = 'change_customers_include'
export const changeCustomersInclude = getIncludePayloadAction(CHANGE_CUSTOMERS_INCLUDE)
