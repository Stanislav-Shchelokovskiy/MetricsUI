import { PayloadAction } from '@reduxjs/toolkit'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'
import { FilterParameterNode, FilterParametersNode } from '../../common/store/multiset_container/sets/Interfaces'
import { SupportMetricsShareableStore } from './Store'
import { INITIAL_SETS, DEFAULT_SET } from './sets/Defaults'
import { setsValidator } from './StoreStateValidator'
import { getSetsReducer } from '../../common/store/multiset_container/sets/SetsReducerFactory'
import { bugsReducer } from './sets/BugsReducer'
import { catReducer } from './sets/CATReducer'
import { commonReducer } from './sets/CommonReducer'
import { customersReducer } from './sets/CustomersReducer'
import { employeesReducer } from './sets/EmployeesReducer'
import { platformsProductsReducer } from './sets/PlatformsProductsReducer'
import { ticketsReducer } from './sets/TicketsReducer'
import { ticketTypesReducer } from './sets/TicketTypesReducer'

export interface SetState extends BaseSetState {
    percentile: FilterParameterNode<number>
    privacy: FilterParameterNode<number> | undefined
    tribes: FilterParametersNode<string> | undefined
    platforms: FilterParametersNode<string> | undefined
    products: FilterParametersNode<string> | undefined
    ticketsTags: FilterParametersNode<string> | undefined
    ticketsTypes: FilterParametersNode<number> | undefined
    versions: FilterParametersNode<string> | undefined
    fixedIn: FilterParametersNode<string> | undefined
    fixedBetween: FilterParametersNode<string> | undefined
    severity: FilterParametersNode<string> | undefined
    ticketStatuses: FilterParametersNode<string> | undefined
    closedBetween: FilterParametersNode<string> | undefined
    ides: FilterParametersNode<string> | undefined
    operatingSystems: FilterParametersNode<string> | undefined
    frameworks: FilterParametersNode<string> | undefined
    duplicatedToTicketsTypes: FilterParametersNode<number> | undefined
    customersGroups: FilterParametersNode<string> | undefined
    customersTypes: FilterParametersNode<number> | undefined
    conversionsTypes: FilterParametersNode<number> | undefined
    assignedTo: FilterParametersNode<string> | undefined
    closedBy: FilterParametersNode<string> | undefined
    fixedBy: FilterParametersNode<string> | undefined
    repliesTypes: FilterParametersNode<string> | undefined
    components: FilterParametersNode<string> | undefined
    features: FilterParametersNode<string> | undefined
    customers: FilterParametersNode<string> | undefined
}

export function setsReducer(sets: Array<SetState> = INITIAL_SETS, action: PayloadAction<any>): Array<SetState> {
    let res = setsReducerDefault(sets, action)
    res = commonReducer(res, action)
    res = bugsReducer(res, action)
    res = catReducer(res, action)
    res = platformsProductsReducer(res, action)
    res = customersReducer(res, action)
    res = ticketTypesReducer(res, action)
    res = ticketsReducer(res, action)
    return employeesReducer(res, action)
}

const setsReducerDefault = getSetsReducer<SetState, SupportMetricsShareableStore>(DEFAULT_SET, INITIAL_SETS, setsValidator)
