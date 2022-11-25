import { AnyAction } from '@reduxjs/toolkit'
import { SetState, INITIAL_SET_STATE } from './SetReducer'
import {
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
    ADD_SET,
    REMOVE_SET,
} from './Actions'


export interface CustomersActivityState {
    range: Array<string>
    groupByPeriod: string
    metric: string
    sets: Array<SetState>
}

const INITIAL_CUSTOMERS_ACTIVITY_STATE: CustomersActivityState = {
    range: Array<string>(),
    groupByPeriod: '',
    metric: '',
    sets: [INITIAL_SET_STATE]
}


export const CustomersActivityReducer = (state: CustomersActivityState = INITIAL_CUSTOMERS_ACTIVITY_STATE, action: AnyAction): CustomersActivityState => {
    console.log('CustomersActivityReducer', state)

    switch (action.type) {
        case CHANGE_PERIOD:
            return {
                ...state,
                range: action.payload
            }
        case CHANGE_GROUP_BY_PERIOD:
            return {
                ...state,
                groupByPeriod: action.payload
            }
        case CHANGE_METRIC:
            return {
                ...state,
                metric: action.payload
            }
        case ADD_SET:
            const baseSet = state.sets.find(x => x.title === action.payload) || INITIAL_SET_STATE

            let setsLength = state.sets.length
            let isNotUniqueTitle
            do {
                setsLength++
                let setsLengthInner = setsLength
                isNotUniqueTitle = state.sets.find(x => x.title === setsLengthInner.toString()) !== undefined
            } while (isNotUniqueTitle)

            return {
                ...state,
                sets: [...state.sets, { ...baseSet, title: setsLength.toString() }]
            }
        case REMOVE_SET:
            return {
                ...state,
                sets: state.sets.filter(set => set.title !== action.payload)
            }
        default:
            if (state.sets.length === 0) {
                return {
                    ...state,
                    sets: [INITIAL_SET_STATE]
                }
            }
            return state
    }
}
