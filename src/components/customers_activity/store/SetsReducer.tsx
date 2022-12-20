import { AnyAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../../common/store/state/Actions'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_TRIBES,
    CHANGE_CUSTOMERS_GROUPS,
    CHANGE_TICKETS_TYPES,
    CHANGE_TICKETS_TAGS,
    CHANGE_REPLIES_TYPES,
    CHANGE_COMPONENTS,
    CHANGE_FEATURES,
    CHANGE_TRIBES_INCLUDE,
    CHANGE_CUSTOMERS_GROUPS_INCLUDE,
    CHANGE_TICKETS_TYPES_INCLUDE,
    CHANGE_TICKETS_TAGS_INCLUDE,
    CHANGE_REPLIES_TYPES_INCLUDE,
    CHANGE_COMPONENTS_INCLUDE,
    CHANGE_FEATURES_INCLUDE,
    CHANGE_SET_TITLE,
    CHANGE_CUSTOMERS_TYPES,
    CHANGE_CUSTOMERS_TYPES_INCLUDE,
    APPLY_CUSTOMERS_TYPES_STATE,
} from './Actions'


export interface FilterParametersNode<T> {
    include: boolean
    values: Array<T>
}

export function getDefaultFilterParametersNode<T>(): FilterParametersNode<T> {
    return {
        include: true,
        values: Array<T>()
    }
}

export interface SetState {
    title: string
    tribes: FilterParametersNode<string>
    customersGroups: FilterParametersNode<string>
    ticketsTags: FilterParametersNode<number>
    ticketsTypes: FilterParametersNode<number>
    customersTypes: FilterParametersNode<number>
    repliesTypes: FilterParametersNode<string>
    components: FilterParametersNode<string>
    features: FilterParametersNode<string>
}


export const INITIAL_SET_STATE: SetState = {
    title: '0',
    tribes: getDefaultFilterParametersNode<string>(),
    customersGroups: getDefaultFilterParametersNode<string>(),
    ticketsTags: getDefaultFilterParametersNode<number>(),
    ticketsTypes: getDefaultFilterParametersNode<number>(),
    customersTypes: getDefaultFilterParametersNode<number>(),
    repliesTypes: getDefaultFilterParametersNode<string>(),
    components: getDefaultFilterParametersNode<string>(),
    features: getDefaultFilterParametersNode<string>(),
}

const INTIAL_SETS_STATE: Array<SetState> = [INITIAL_SET_STATE]

export const SetsReducer = (state: Array<SetState> = INTIAL_SETS_STATE, action: AnyAction): Array<SetState> => {
    switch (action.type) {

        case ADD_SET:
            const baseSet = state.find(x => x.title === action.payload) || INITIAL_SET_STATE
            return [...state, { ...baseSet, title: GenerateNewSetTitle(state.map(x => x.title)) }]

        case REMOVE_SET:
            return state.filter(set => set.title !== action.payload)

        case CHANGE_TRIBES:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    tribes: {
                        ...x.tribes,
                        values: action.payload.data,
                    },
                    components: INITIAL_SET_STATE.components,
                    features: INITIAL_SET_STATE.features,
                }
            })
        case CHANGE_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    tribes: {
                        ...x.tribes,
                        include: action.payload.data,
                    },
                    components: INITIAL_SET_STATE.components,
                    features: INITIAL_SET_STATE.features,
                }
            })

        case CHANGE_CUSTOMERS_GROUPS:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    customersGroups: {
                        ...x.customersGroups,
                        values: action.payload.data,
                    }
                }
            })

        case CHANGE_CUSTOMERS_GROUPS_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    customersGroups: {
                        ...x.customersGroups,
                        include: action.payload.data,
                    }
                }
            })

        case CHANGE_TICKETS_TAGS:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    ticketsTags: {
                        ...x.ticketsTags,
                        values: action.payload.data,
                    }
                }
            })

        case CHANGE_TICKETS_TAGS_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    ticketsTags: {
                        ...x.ticketsTags,
                        include: action.payload.data,
                    }
                }
            })

        case CHANGE_TICKETS_TYPES:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    ticketsTypes: {
                        ...x.ticketsTypes,
                        values: action.payload.data
                    }
                }
            })
        case CHANGE_TICKETS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    ticketsTypes: {
                        ...x.ticketsTypes,
                        include: action.payload.data
                    }
                }
            })

        case CHANGE_REPLIES_TYPES:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    repliesTypes: {
                        ...x.repliesTypes,
                        values: action.payload.data
                    }
                }
            })

        case CHANGE_REPLIES_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    repliesTypes: {
                        ...x.repliesTypes,
                        include: action.payload.data
                    }
                }
            })

        case CHANGE_COMPONENTS:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    components: {
                        ...x.components,
                        values: action.payload.data,
                    },
                    features: INITIAL_SET_STATE.features
                }
            })

        case CHANGE_COMPONENTS_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    components: {
                        ...x.components,
                        include: action.payload.data,
                    },
                    features: INITIAL_SET_STATE.features
                }
            })

        case CHANGE_FEATURES:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    features: {
                        ...x.features,
                        values: action.payload.data
                    },
                }
            })
        case CHANGE_FEATURES_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    features: {
                        ...x.features,
                        include: action.payload.data
                    },
                }
            })

        case APPLY_CUSTOMERS_TYPES_STATE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    customersTypes: action.payload.data,
                }
            })

        case CHANGE_CUSTOMERS_TYPES:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    customersTypes: {
                        ...x.customersTypes,
                        values: action.payload.data
                    },
                }
            })

        case CHANGE_CUSTOMERS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    customersTypes: {
                        ...x.customersTypes,
                        include: action.payload.data
                    },
                }
            })

        case APPLY_STATE:
            return action.payload.customersActivitySets

        case CHANGE_SET_TITLE:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    title: action.payload.data,
                }
            })

        default:
            return state
    }
}

export function GenerateNewSetTitle(existingSetsTitles: Array<string>): string {
    let setsLength = existingSetsTitles.length
    let isNotUniqueTitle
    do {
        setsLength++
        let setsLengthInner = setsLength
        isNotUniqueTitle = existingSetsTitles.find(x => x === setsLengthInner.toString()) !== undefined
    } while (isNotUniqueTitle)
    return setsLength.toString()
}

function updateSetState<T extends SetState>(title: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.title === title ? replaceState(x) : x })
}
