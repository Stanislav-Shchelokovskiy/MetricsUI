import { PayloadAction } from '@reduxjs/toolkit'
import { setsValidator } from '../StoreStateValidator'
import { getSetsReducer } from '../../../common/store/multiset_container/sets/SetsReducerFactory'
import { bugsReducer } from './BugsReducer'
import { catReducer } from './CATReducer'
import { commonReducer } from './CommonReducer'
import { customersReducer } from './CustomersReducer'
import { employeesReducer } from '../../../common/store/multiset_container/sets/EmployeesReducer'
import { platformsProductsReducer } from './PlatformsProductsReducer'
import { ticketsReducer } from './TicketsReducer'
import { ticketTypesReducer } from './TicketTypesReducer'
import { SetState } from './Interfaces'
import { DEFAULT_SET, INITIAL_SETS } from './Defaults'


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

const setsReducerDefault = getSetsReducer<SetState>(DEFAULT_SET, INITIAL_SETS, setsValidator)
