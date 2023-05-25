import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './sets_reducer/Interfaces'
import { CustomersActivityShareableState } from './Store'
import { INITIAL_SETS, DEFAULT_SET } from './sets_reducer/Defaults'
import { setsValidator } from './StoreStateValidator'
import { getViewStateReducer } from '../../common/store/set_container/ViewStateReducer'
import { getSetsCRUDReducer } from '../../common/store/set_container/sets/reducers/SetsCRUDReducer'
import { bugsReducer } from './sets_reducer/BugsReducer'
import { catReducer } from './sets_reducer/CATReducer'
import { commonReducer } from './sets_reducer/CommonReducer'
import { customersReducer } from './sets_reducer/CustomersReducer'
import { employeesReducer } from './sets_reducer/EmployeesReducer'
import { platformsProductsReducer } from './sets_reducer/PlatformsProductsReducer'
import { ticketsReducer } from './sets_reducer/TicketsReducer'
import { ticketTypesReducer } from './sets_reducer/TicketTypesReducer'

export function SetsReducer(sets: Array<SetState> = INITIAL_SETS, action: AnyAction): Array<SetState> {
    let res = setsCRUDReducer(sets, action)
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

const setsCRUDReducer = getSetsCRUDReducer<SetState>(DEFAULT_SET, INITIAL_SETS)
const stateReducer = getViewStateReducer<Array<SetState>, CustomersActivityShareableState>(setsValidator)
