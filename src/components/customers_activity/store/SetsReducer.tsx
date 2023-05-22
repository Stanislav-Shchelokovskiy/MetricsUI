import { AnyAction } from '@reduxjs/toolkit'
import { Set } from './sets_reducer/Interfaces'
import { INITIAL_SETS, DEFAULT_SET } from './sets_reducer/Defaults'
import { validateCustomersActivitySetsProperties } from './StoreStateValidator'
import { getStateReducer } from '../../common/store/set_container/sets/SetsReducer'
import { getSetsReducer } from '../../common/store/set_container/sets/SetsReducer'
import { bugsReducer } from './sets_reducer/BugsReducer'
import { catReducer } from './sets_reducer/CATReducer'
import { commonReducer } from './sets_reducer/CommonReducer'
import { customersReducer } from './sets_reducer/CustomersReducer'
import { employeesReducer } from './sets_reducer/EmployeesReducer'
import { platformsProductsReducer } from './sets_reducer/PlatformsProductsReducer'
import { ticketsReducer } from './sets_reducer/TicketsReducer'
import { ticketTypesReducer } from './sets_reducer/TicketTypesReducer'

export const SetsReducer = (sets: Array<Set> = INITIAL_SETS, action: AnyAction): Array<Set> => {
    let res = setsReducer(sets, action)
    res = stateReducer(res, action)
    res = commonReducer(res, action)
    res = bugsReducer(res, action)
    res = catReducer(res, action)
    res = platformsProductsReducer(res, action)
    res = customersReducer(res, action)
    res = ticketTypesReducer(res, action)
    res = ticketsReducer(res, action)
    return employeesReducer(res, action)
}

const setsReducer = getSetsReducer<Set>(DEFAULT_SET, INITIAL_SETS)
const stateReducer = getStateReducer(validateCustomersActivitySetsProperties)
