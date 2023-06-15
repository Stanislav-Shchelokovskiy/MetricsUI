import { PayloadAction } from '@reduxjs/toolkit'
import { SetState } from './sets/Interfaces'
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
