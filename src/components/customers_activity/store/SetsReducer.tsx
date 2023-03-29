import { AnyAction } from '@reduxjs/toolkit'
import { Set } from './sets_reducer/Interfaces'
import { INITIAL_SETS } from './sets_reducer/Defaults'
import { bugsReducer } from './sets_reducer/BugsReducer'
import { catReducer } from './sets_reducer/CATReducer'
import { commonReducer } from './sets_reducer/CommonReducer'
import { customersReducer } from './sets_reducer/CustomersReducer'
import { employeesReducer } from './sets_reducer/EmployeesReducer'
import { generalReducer } from './sets_reducer/GeneralReducer'
import { platformsProductsReducer } from './sets_reducer/PlatformsProductsReducer'
import { ticketsReducer } from './sets_reducer/TicketsReducer'
import { ticketTypesReducer } from './sets_reducer/TicketTypesReducer'

export const SetsReducer = (sets: Array<Set> = INITIAL_SETS, action: AnyAction): Array<Set> => {
    let res = generalReducer(sets, action)
    res = commonReducer(res, action)
    res = bugsReducer(res, action)
    res = catReducer(res, action)
    res = platformsProductsReducer(res, action)
    res = customersReducer(res, action)
    res = ticketTypesReducer(res, action)
    res = ticketsReducer(res, action)
    return employeesReducer(res, action)
}
