import { AnyAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../../common/store/state/Actions'
import { initMissingCustomersActivitySetsProperties } from './StoreStateMissingPropertiesInitializator'
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
    CHANGE_CONVERSIONS_TYPES,
    CHANGE_CONVERSIONS_TYPES_INCLUDE,
    CHANGE_PLATFORMS,
    CHANGE_PLATFORMS_INCLUDE,
    CHANGE_PRODUCTS,
    CHANGE_PRODUCTS_INCLUDE,
    CHANGE_POSITIONS,
    CHANGE_POSITIONS_INCLUDE,
    CHANGE_EMP_TRIBES,
    CHANGE_EMP_TRIBES_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
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
    positions: FilterParametersNode<string>
    empTribes: FilterParametersNode<string>
    employees: FilterParametersNode<string>
    platforms: FilterParametersNode<string>
    products: FilterParametersNode<string>
    customersGroups: FilterParametersNode<string>
    ticketsTags: FilterParametersNode<number>
    ticketsTypes: FilterParametersNode<number>
    customersTypes: FilterParametersNode<number>
    conversionsTypes: FilterParametersNode<number>
    repliesTypes: FilterParametersNode<string>
    components: FilterParametersNode<string>
    features: FilterParametersNode<string>
}


export const INITIAL_SET: SetState = {
    title: '0',
    tribes: getDefaultFilterParametersNode<string>(),
    positions: getDefaultFilterParametersNode<string>(),
    empTribes: getDefaultFilterParametersNode<string>(),
    employees: getDefaultFilterParametersNode<string>(),
    platforms: getDefaultFilterParametersNode<string>(),
    products: getDefaultFilterParametersNode<string>(),
    customersGroups: getDefaultFilterParametersNode<string>(),
    ticketsTags: getDefaultFilterParametersNode<number>(),
    ticketsTypes: getDefaultFilterParametersNode<number>(),
    customersTypes: getDefaultFilterParametersNode<number>(),
    conversionsTypes: getDefaultFilterParametersNode<number>(),
    repliesTypes: getDefaultFilterParametersNode<string>(),
    components: getDefaultFilterParametersNode<string>(),
    features: getDefaultFilterParametersNode<string>(),
}

const INTIAL_SETS: Array<SetState> = [INITIAL_SET]

export const SetsReducer = (sets: Array<SetState> = INTIAL_SETS, action: AnyAction): Array<SetState> => {
    switch (action.type) {

        case ADD_SET:
            const baseSet = sets.find(x => x.title === action.payload) || INITIAL_SET
            return [...sets, { ...baseSet, title: GenerateNewSetTitle(sets.map(x => x.title)) }]

        case REMOVE_SET:
            return sets.length < 2 ? INTIAL_SETS : sets.filter(set => set.title !== action.payload)

        case CHANGE_TRIBES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tribes: {
                        ...x.tribes,
                        values: action.payload.data,
                    },
                    components: INITIAL_SET.components,
                    features: INITIAL_SET.features,
                    platforms: INITIAL_SET.platforms,
                    products: INITIAL_SET.products,
                }
            })
        case CHANGE_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tribes: {
                        ...x.tribes,
                        include: action.payload.data,
                    },
                    components: INITIAL_SET.components,
                    features: INITIAL_SET.features,
                    platforms: INITIAL_SET.platforms,
                    products: INITIAL_SET.products,
                }
            })

        case CHANGE_CUSTOMERS_GROUPS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersGroups: {
                        ...x.customersGroups,
                        values: action.payload.data,
                    }
                }
            })

        case CHANGE_CUSTOMERS_GROUPS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersGroups: {
                        ...x.customersGroups,
                        include: action.payload.data,
                    }
                }
            })

        case CHANGE_TICKETS_TAGS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTags: {
                        ...x.ticketsTags,
                        values: action.payload.data,
                    }
                }
            })

        case CHANGE_TICKETS_TAGS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTags: {
                        ...x.ticketsTags,
                        include: action.payload.data,
                    }
                }
            })

        case CHANGE_TICKETS_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTypes: {
                        ...x.ticketsTypes,
                        values: action.payload.data
                    }
                }
            })
        case CHANGE_TICKETS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTypes: {
                        ...x.ticketsTypes,
                        include: action.payload.data
                    }
                }
            })

        case CHANGE_REPLIES_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    repliesTypes: {
                        ...x.repliesTypes,
                        values: action.payload.data
                    }
                }
            })

        case CHANGE_REPLIES_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    repliesTypes: {
                        ...x.repliesTypes,
                        include: action.payload.data
                    }
                }
            })

        case CHANGE_COMPONENTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    components: {
                        ...x.components,
                        values: action.payload.data,
                    },
                    features: INITIAL_SET.features
                }
            })

        case CHANGE_COMPONENTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    components: {
                        ...x.components,
                        include: action.payload.data,
                    },
                    features: INITIAL_SET.features
                }
            })

        case CHANGE_FEATURES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    features: {
                        ...x.features,
                        values: action.payload.data
                    },
                }
            })
        case CHANGE_FEATURES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    features: {
                        ...x.features,
                        include: action.payload.data
                    },
                }
            })

        case CHANGE_CUSTOMERS_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersTypes: {
                        ...x.customersTypes,
                        values: action.payload.data
                    },
                    conversionsTypes: INITIAL_SET.conversionsTypes,
                }
            })

        case CHANGE_CUSTOMERS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    customersTypes: {
                        ...x.customersTypes,
                        include: action.payload.data
                    },
                    conversionsTypes: INITIAL_SET.conversionsTypes,
                }
            })

        case CHANGE_CONVERSIONS_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    conversionsTypes: {
                        ...x.conversionsTypes,
                        values: action.payload.data
                    },
                }
            })

        case CHANGE_CONVERSIONS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    conversionsTypes: {
                        ...x.conversionsTypes,
                        include: action.payload.data
                    },
                }
            })

        case CHANGE_PLATFORMS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    platforms: {
                        ...x.platforms,
                        values: action.payload.data
                    },
                    products: INITIAL_SET.products,
                }
            })

        case CHANGE_PLATFORMS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    platforms: {
                        ...x.platforms,
                        include: action.payload.data
                    },
                    products: INITIAL_SET.products,
                }
            })

        case CHANGE_PRODUCTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    products: {
                        ...x.products,
                        values: action.payload.data
                    },
                }
            })

        case CHANGE_PRODUCTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    products: {
                        ...x.products,
                        include: action.payload.data
                    },
                }
            })

        case CHANGE_POSITIONS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: {
                        ...x.positions,
                        values: action.payload.data
                    },
                }
            })

        case CHANGE_POSITIONS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: {
                        ...x.positions,
                        include: action.payload.data
                    },
                }
            })

        case CHANGE_EMP_TRIBES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTribes: {
                        ...x.empTribes,
                        values: action.payload.data
                    },
                }
            })

        case CHANGE_EMP_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTribes: {
                        ...x.empTribes,
                        include: action.payload.data
                    },
                }
            })

        case CHANGE_EMPLOYEES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    employees: {
                        ...x.employees,
                        values: action.payload.data
                    },
                }
            })

        case CHANGE_EMPLOYEES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    employees: {
                        ...x.employees,
                        include: action.payload.data
                    },
                }
            })

        case APPLY_STATE:
            return initMissingCustomersActivitySetsProperties(action.payload.customersActivitySets)

        case CHANGE_SET_TITLE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    title: action.payload.data,
                }
            })

        default:
            return sets
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
