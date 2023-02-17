import { AnyAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../../common/store/state/Actions'
import { initMissingCustomersActivitySetsProperties } from './StoreStateMissingPropertiesInitializator'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
} from './actions/Common'
import {
    CHANGE_PERCENTILE,
    CHANGE_PERCENTILE_INCLUDE,
    CHANGE_TRIBES,
    CHANGE_TRIBES_INCLUDE,
    CHANGE_TICKETS_TAGS,
    CHANGE_TICKETS_TAGS_INCLUDE,
} from './actions/SetCommon'
import {
    CHANGE_REPLIES_TYPES,
    CHANGE_REPLIES_TYPES_INCLUDE,
    CHANGE_COMPONENTS,
    CHANGE_COMPONENTS_INCLUDE,
    CHANGE_FEATURES,
    CHANGE_FEATURES_INCLUDE,
} from './actions/CAT'
import {
    CHANGE_PLATFORMS,
    CHANGE_PLATFORMS_INCLUDE,
    CHANGE_PRODUCTS,
    CHANGE_PRODUCTS_INCLUDE,
} from './actions/PlatformsProducts'
import {
    CHANGE_CUSTOMERS_GROUPS,
    CHANGE_CUSTOMERS_GROUPS_INCLUDE,
    CHANGE_CUSTOMERS_TYPES,
    CHANGE_CUSTOMERS_TYPES_INCLUDE,
    CHANGE_CONVERSIONS_TYPES,
    CHANGE_CONVERSIONS_TYPES_INCLUDE,
    CHANGE_CUSTOMERS,
    CHANGE_CUSTOMERS_INCLUDE,
} from './actions/Customers'
import {
    CHANGE_POSITIONS,
    CHANGE_POSITIONS_INCLUDE,
    CHANGE_EMP_TRIBES,
    CHANGE_EMP_TRIBES_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
} from './actions/Employees'
import {
    CHANGE_TICKETS_TYPES,
    CHANGE_TICKETS_TYPES_INCLUDE,
    CHANGE_DUPLICATED_TO_TICKETS_TYPES,
    CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE,
} from './actions/TicketsTypes'
import {
    CHANGE_VERSIONS,
    CHANGE_VERSIONS_INCLUDE,
    CHANGE_IDEs,
    CHANGE_IDEs_INCLUDE,
    CHANGE_OPERATING_SYSTEMS,
    CHANGE_OPERATING_SYSTEMS_INCLUDE,
    CHANGE_FRAMEWORKS,
    CHANGE_FRAMEWORKS_INCLUDE,
    CHANGE_PRIVACY,
} from './actions/Tickets'
import {
    CHANGE_FIXED_IN,
    CHANGE_FIXED_IN_INCLUDE,
    CHANGE_SEVERITY,
    CHANGE_SEVERITY_INCLUDE,
    CHANGE_STATUSES,
    CHANGE_TICKET_STATUSES_INCLUDE,
} from './actions/Bugs'


interface FilterNode {
    include: boolean
}

export interface FilterParametersNode<T> extends FilterNode {
    values: Array<T>
}

export function getDefaultFilterParametersNode<T>(defaultValue: Array<T> | undefined = undefined): FilterParametersNode<T> | undefined {
    if (defaultValue === undefined)
        return undefined
    return {
        include: true,
        values: defaultValue
    }
}

export interface FilterParameterNode<T> extends FilterNode {
    value: T
}

export function getDefaultFilterParameterNode<T = string | number>(defaultValue: T): FilterParameterNode<T> {
    return {
        include: true,
        value: defaultValue
    }
}

export interface Set {
    title: string
    percentile: FilterParameterNode<number>
    privacy: FilterParameterNode<number> | undefined
    tribes: FilterParametersNode<string> | undefined
    platforms: FilterParametersNode<string> | undefined
    products: FilterParametersNode<string> | undefined
    ticketsTags: FilterParametersNode<number> | undefined
    ticketsTypes: FilterParametersNode<number> | undefined
    versions: FilterParametersNode<string> | undefined
    fixedIn: FilterParametersNode<string> | undefined
    severity: FilterParametersNode<string> | undefined
    ticketStatuses: FilterParametersNode<string> | undefined
    ides: FilterParametersNode<string> | undefined
    operatingSystems: FilterParametersNode<string> | undefined
    frameworks: FilterParametersNode<string> | undefined
    duplicatedToTicketsTypes: FilterParametersNode<number> | undefined
    customersGroups: FilterParametersNode<string> | undefined
    customersTypes: FilterParametersNode<number> | undefined
    conversionsTypes: FilterParametersNode<number> | undefined
    positions: FilterParametersNode<string> | undefined
    empTribes: FilterParametersNode<string> | undefined
    employees: FilterParametersNode<string> | undefined
    repliesTypes: FilterParametersNode<string> | undefined
    components: FilterParametersNode<string> | undefined
    features: FilterParametersNode<string> | undefined
    customers: FilterParametersNode<string> | undefined
}

export function getAliasedSet(set: Set) {
    return {
        Percentile: set.percentile,
        Privacy: set.privacy,
        Tribes: set.tribes,
        Platforms: set.platforms,
        Products: set.products,
        'Versions': set.versions,
        'Ticket tags': set.ticketsTags,
        'Ticket types': set.ticketsTypes,
        'Fixed In': set.fixedIn,
        'Severity': set.severity,
        'IDE': set.ides,
        'Operating systems': set.operatingSystems,
        'Frameworks/Specifics': set.frameworks,
        'Ticket statuses': set.ticketStatuses,
        'Duplicated to ticket types': set.duplicatedToTicketsTypes,
        'User groups': set.customersGroups,
        'User types': set.customersTypes,
        'User conversion types': set.conversionsTypes,
        'Employees positions': set.positions,
        'Employees tribes': set.empTribes,
        'Employees': set.employees,
        'CAT replies types': set.repliesTypes,
        'CAT components': set.components,
        'CAT features': set.features,
        'Customers': set.customers,
    }
}

export function getSetDataFields() {
    return Object.getOwnPropertyNames(getAliasedSet(DEFAULT_SET)).map(x => {
        return {
            dataField: x,
            filterOperations: ['<=', '=', '>', 'in', 'notin']
        }
    })
}


export const DEFAULT_SET: Set = {
    title: '0',
    percentile: getDefaultFilterParameterNode<number>(100),
    ticketsTypes: getDefaultFilterParametersNode<number>([1]),
    privacy: getDefaultFilterParameterNode<number>(0),
    tribes: getDefaultFilterParametersNode<string>(),
    platforms: getDefaultFilterParametersNode<string>(),
    products: getDefaultFilterParametersNode<string>(),
    ticketsTags: getDefaultFilterParametersNode<number>(),
    versions: getDefaultFilterParametersNode<string>(),
    fixedIn: getDefaultFilterParametersNode<string>(),
    severity: getDefaultFilterParametersNode<string>(),
    ticketStatuses: getDefaultFilterParametersNode<string>(),
    ides: getDefaultFilterParametersNode<string>(),
    operatingSystems: getDefaultFilterParametersNode<string>(),
    frameworks: getDefaultFilterParametersNode<string>(),
    duplicatedToTicketsTypes: getDefaultFilterParametersNode<number>(),
    customersGroups: getDefaultFilterParametersNode<string>(),
    customersTypes: getDefaultFilterParametersNode<number>(),
    conversionsTypes: getDefaultFilterParametersNode<number>(),
    positions: getDefaultFilterParametersNode<string>(),
    empTribes: getDefaultFilterParametersNode<string>(),
    employees: getDefaultFilterParametersNode<string>(),
    repliesTypes: getDefaultFilterParametersNode<string>(),
    components: getDefaultFilterParametersNode<string>(),
    features: getDefaultFilterParametersNode<string>(),
    customers: getDefaultFilterParametersNode<string>(),
}

const INTIAL_SETS: Array<Set> = [DEFAULT_SET]

export const SetsReducer = (sets: Array<Set> = INTIAL_SETS, action: AnyAction): Array<Set> => {
    switch (action.type) {

        case APPLY_STATE:
            return initMissingCustomersActivitySetsProperties(action.payload.customersActivitySets)


        case ADD_SET:
            const baseSet = sets.find(x => x.title === action.payload) || DEFAULT_SET
            return [...sets, { ...baseSet, title: GenerateNewSetTitle(sets.map(x => x.title)) }]
        case REMOVE_SET:
            return sets.length < 2 ? INTIAL_SETS : sets.filter(set => set.title !== action.payload)


        case CHANGE_SET_TITLE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    title: action.payload.data,
                }
            })


        case CHANGE_PERCENTILE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    percentile: {
                        ...x.percentile,
                        value: action.payload.data,
                    }
                }
            })
        case CHANGE_PERCENTILE_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    percentile: {
                        ...x.percentile,
                        include: action.payload.data,
                    }
                }
            })


        case CHANGE_PRIVACY:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    privacy: action.payload.data === undefined ? undefined : {
                        include: true,
                        value: action.payload.data,
                    },
                }
            })


        case CHANGE_TICKETS_TYPES:
            const new_values = action.payload.data === undefined || action.payload.data.length === 0 ? DEFAULT_SET.ticketsTypes?.values : action.payload.data
            const target_set = sets.find(x => x.title === action.payload.stateId)
            const values = target_set?.ticketsTypes?.values
            if (JSON.stringify(values) === JSON.stringify(new_values))
                return sets
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTypes: updateValues(x.ticketsTypes, new_values)
                }
            })
        case CHANGE_TICKETS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTypes: updateInclude(x.ticketsTypes, action.payload.data)
                }
            })


        case CHANGE_TRIBES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tribes: updateValues(x.tribes, action.payload.data)
                }
            })
        case CHANGE_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tribes: updateInclude(x.tribes, action.payload.data)
                }
            })


        case CHANGE_PLATFORMS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    platforms: updateValues(x.platforms, action.payload.data)
                }
            })
        case CHANGE_PLATFORMS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    platforms: updateInclude(x.platforms, action.payload.data)
                }
            })


        case CHANGE_PRODUCTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    products: updateValues(x.products, action.payload.data)
                }
            })
        case CHANGE_PRODUCTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    products: updateInclude(x.products, action.payload.data)
                }
            })


        case CHANGE_TICKETS_TAGS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTags: updateValues(x.ticketsTags, action.payload.data)
                }
            })
        case CHANGE_TICKETS_TAGS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketsTags: updateInclude(x.ticketsTags, action.payload.data)
                }
            })


        case CHANGE_DUPLICATED_TO_TICKETS_TYPES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    duplicatedToTicketsTypes: updateValues(x.duplicatedToTicketsTypes, action.payload.data)
                }
            })
        case CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    duplicatedToTicketsTypes: updateInclude(x.duplicatedToTicketsTypes, action.payload.data)
                }
            })


        case CHANGE_VERSIONS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    versions: updateValues(x.versions, action.payload.data)
                }
            })
        case CHANGE_VERSIONS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    versions: updateInclude(x.versions, action.payload.data)
                }
            })


        case CHANGE_FIXED_IN:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    fixedIn: updateValues(x.fixedIn, action.payload.data)
                }
            })
        case CHANGE_FIXED_IN_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    fixedIn: updateInclude(x.fixedIn, action.payload.data)
                }
            })


        case CHANGE_SEVERITY:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    severity: updateValues(x.severity, action.payload.data)
                }
            })
        case CHANGE_SEVERITY_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    severity: updateInclude(x.severity, action.payload.data)
                }
            })


        case CHANGE_STATUSES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketStatuses: updateValues(x.ticketStatuses, action.payload.data)
                }
            })
        case CHANGE_TICKET_STATUSES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ticketStatuses: updateInclude(x.ticketStatuses, action.payload.data)
                }
            })


        case CHANGE_IDEs:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ides: updateValues(x.ides, action.payload.data)
                }
            })
        case CHANGE_IDEs_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ides: updateInclude(x.ides, action.payload.data)
                }
            })


        case CHANGE_OPERATING_SYSTEMS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    operatingSystems: updateValues(x.operatingSystems, action.payload.data)
                }
            })
        case CHANGE_OPERATING_SYSTEMS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    operatingSystems: updateInclude(x.operatingSystems, action.payload.data)
                }
            })


        case CHANGE_FRAMEWORKS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    frameworks: updateValues(x.frameworks, action.payload.data)
                }
            })
        case CHANGE_FRAMEWORKS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    frameworks: updateInclude(x.frameworks, action.payload.data)
                }
            })


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
                    customersGroups: updateInclude(x.customersGroups, action.payload.data)
                }
            })


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
                    customersTypes: updateInclude(x.customersTypes, action.payload.data)
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
                    conversionsTypes: updateInclude(x.conversionsTypes, action.payload.data)
                }
            })


        case CHANGE_POSITIONS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: updateValues(x.positions, action.payload.data)
                }
            })
        case CHANGE_POSITIONS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: updateInclude(x.positions, action.payload.data)
                }
            })

        case CHANGE_EMP_TRIBES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTribes: updateValues(x.empTribes, action.payload.data)
                }
            })
        case CHANGE_EMP_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTribes: updateInclude(x.empTribes, action.payload.data)
                }
            })

        case CHANGE_EMPLOYEES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    employees: updateValues(x.employees, action.payload.data)
                }
            })
        case CHANGE_EMPLOYEES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    employees: updateInclude(x.employees, action.payload.data)
                }
            })


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
                    customers: updateInclude(x.customers, action.payload.data),
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

function updateSetState<T extends Set>(title: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.title === title ? replaceState(x) : x })
}

export function updateValues<T>(obj: FilterParametersNode<T> | undefined, values: Array<T> | undefined): FilterParametersNode<T> | undefined {
    if (obj === undefined) {
        if (values !== undefined && values.length > 0)
            return {
                include: true,
                values: values
            }
        return undefined
    }
    if (obj.include && (values === undefined || values.length === 0))
        return undefined
    return {
        ...obj,
        values: values || []
    }
}

export function updateInclude<T>(obj: FilterParametersNode<T> | undefined, include: boolean): FilterParametersNode<T> | undefined {
    if (obj === undefined) {
        if (!include)
            return {
                include: include,
                values: Array<T>()
            }
        return obj
    }
    if (include && obj.values.length === 0)
        return undefined
    return {
        ...obj,
        include: include
    }
}
