import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState, updateValues, updateInclude } from './Utils'
import { Set, FilterParametersNode } from './Interfaces'
import { DEFAULT_SET } from './Defaults'
import { bugIsNotSelected } from '../Utils'
import {
    CHANGE_TICKETS_TYPES,
    CHANGE_TICKETS_TYPES_INCLUDE,
    CHANGE_DUPLICATED_TO_TICKETS_TYPES,
    CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE,
} from '../actions/TicketsTypes'


export function ticketTypesReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
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
                    duplicatedToTicketsTypes: updateInclude(x.duplicatedToTicketsTypes, action.payload.data)
                }
            })


        default:
            return sets
    }
}

function _updateValues(set: Set, newTicketTypes: Array<number> | undefined) {
    const ticketTypes = updateValues(set.ticketsTypes, newTicketTypes)
    return tryGetBugFreeState(set, ticketTypes)
}

function _updateInclude(set: Set, newTicketTypesInclude: boolean) {
    const ticketTypes = updateInclude(set.ticketsTypes, newTicketTypesInclude)
    return tryGetBugFreeState(set, ticketTypes)
}

function tryGetBugFreeState(set: Set, ticketTypes: FilterParametersNode<number> | undefined) {
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
