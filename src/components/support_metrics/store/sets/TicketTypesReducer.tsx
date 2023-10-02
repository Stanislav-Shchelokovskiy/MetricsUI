import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import { StrictNumberFilterParameters } from '../../../common/store/multiset_container/sets/Interfaces'
import { DEFAULT_SET } from './Defaults'
import { bugIsNotSelected } from '../Utils'
import {
    updateSetState,
    updateValues,
    updateValuesInclude
} from '../../../common/store/multiset_container/Utils'
import {
    CHANGE_TICKETS_TYPES,
    CHANGE_TICKETS_TYPES_INCLUDE,
    CHANGE_DUPLICATED_TO_TICKETS_TYPES,
    CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE,
} from '../actions/TicketsTypes'


export function ticketTypesReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_TICKETS_TYPES:
            const newValues = action.payload.data === undefined || action.payload.data.length === 0 ? DEFAULT_SET.ticketsTypes?.values : action.payload.data
            const targetSet = sets.find(x => x.title === action.payload.stateId)
            const values = targetSet?.ticketsTypes?.values
            if (JSON.stringify(values) === JSON.stringify(newValues))
                return sets

            return updateSetState(action.payload.stateId, sets, (x) => {
                return _updateValues(x, newValues)
            })
        case CHANGE_TICKETS_TYPES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return _updateInclude(x, action.payload.data)
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
                    duplicatedToTicketsTypes: updateValuesInclude(x.duplicatedToTicketsTypes, action.payload.data)
                }
            })


        default:
            return sets
    }
}

function _updateValues(set: SetState, newTicketTypes: Array<number> | undefined) {
    const ticketTypes = updateValues(set.ticketsTypes, newTicketTypes)
    return tryGetBugFreeState(set, ticketTypes)
}

function _updateInclude(set: SetState, newTicketTypesInclude: boolean) {
    const ticketTypes = updateValuesInclude(set.ticketsTypes, newTicketTypesInclude)
    return tryGetBugFreeState(set, ticketTypes)
}

function tryGetBugFreeState(set: SetState, ticketTypes: StrictNumberFilterParameters) {
    if (bugIsNotSelected(ticketTypes)) {
        return {
            ...set,
            ticketsTypes: ticketTypes,
            assignedTo: undefined,
            severity: undefined,
            ticketStatuses: undefined,
            closedBy: undefined,
            closedBetween: undefined,
            fixedIn: undefined,
            fixedBy: undefined,
            fixedBetween: undefined,
        }
    }
    return {
        ...set,
        ticketsTypes: ticketTypes,
    }
}
