import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import {
    updateSetState,
    updateValues,
    updateValuesInclude
} from '../../../common/store/multiset_container/Utils'
import {
    CHANGE_CUSTOMERS_GROUPS,
    CHANGE_CUSTOMERS_GROUPS_INCLUDE,
    CHANGE_CUSTOMERS_TYPES,
    CHANGE_CUSTOMERS_TYPES_INCLUDE,
    CHANGE_CONVERSIONS_TYPES,
    CHANGE_CONVERSIONS_TYPES_INCLUDE,
    CHANGE_CUSTOMERS,
    CHANGE_CUSTOMERS_INCLUDE,
} from '../actions/Customers'
import { CHANGE_BASELINE_ALIGNED_MODE } from '../actions/Common'


export function customersReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_CUSTOMERS_GROUPS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersGroups: updateValues(x.customersGroups, action.payload.data)
                }
            })
        case CHANGE_CUSTOMERS_GROUPS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersGroups: updateValuesInclude(x.customersGroups, action.payload.data)
                }
            })
        case CHANGE_BASELINE_ALIGNED_MODE:
            if (action.payload)
                return sets.map((x) => {
                    const groups = x.customersGroups && (x.customersGroups.values.length > 0 ? [x.customersGroups.values[0]] : x.customersGroups.values)
                    return {
                        ...x,
                        customersGroups: updateValues(updateValuesInclude(x.customersGroups, true), groups)
                    }
                })
            return sets


        case CHANGE_CUSTOMERS_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersTypes: updateValues(x.customersTypes, action.payload.data)
                }
            })
        case CHANGE_CUSTOMERS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersTypes: updateValuesInclude(x.customersTypes, action.payload.data)
                }
            })


        case CHANGE_CONVERSIONS_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    conversionsTypes: updateValues(x.conversionsTypes, action.payload.data)
                }
            })
        case CHANGE_CONVERSIONS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    conversionsTypes: updateValuesInclude(x.conversionsTypes, action.payload.data)
                }
            })


        case CHANGE_CUSTOMERS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customers: updateValues(x.customers, action.payload.data)
                }
            })
        case CHANGE_CUSTOMERS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customers: updateValuesInclude(x.customers, action.payload.data),
                }
            })


        default:
            return sets
    }
}
