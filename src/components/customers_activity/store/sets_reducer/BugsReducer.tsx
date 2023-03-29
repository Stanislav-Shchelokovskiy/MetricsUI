import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState, updateValues, updateInclude } from './Utils'
import { closedIsNotSelected } from '../Utils'
import { Set, FilterParametersNode } from './Interfaces'
import {
    CHANGE_FIXED_IN,
    CHANGE_FIXED_IN_INCLUDE,
    CHANGE_SEVERITY,
    CHANGE_SEVERITY_INCLUDE,
    CHANGE_TICKET_STATUSES,
    CHANGE_TICKET_STATUSES_INCLUDE,
    CHANGE_ASSIGNED_TO,
    CHANGE_ASSIGNED_TO_INCLUDE,
    CHANGE_CLOSED_BY,
    CHANGE_CLOSED_BY_INCLUDE,
    CHANGE_FIXED_BY,
    CHANGE_FIXED_BY_INCLUDE,
    CHANGE_CLOSED_BETWEEN,
    CHANGE_CLOSED_BETWEEN_INCLUDE,
    CHANGE_FIXED_BETWEEN,
    CHANGE_FIXED_BETWEEN_INCLUDE,
} from '../actions/Bugs'

export function bugsReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
    switch (action.type) {

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


        case CHANGE_TICKET_STATUSES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return updateTicketStatusesValues(x, action.payload.data)
            })
        case CHANGE_TICKET_STATUSES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return updateTicketStatusesInclude(x, action.payload.data)
            })


        case CHANGE_CLOSED_BETWEEN:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    closedBetween: updateValues(x.closedBetween, action.payload.data)
                }
            })
        case CHANGE_CLOSED_BETWEEN_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    closedBetween: updateInclude(x.closedBetween, action.payload.data)
                }
            })


        case CHANGE_CLOSED_BY:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    closedBy: updateValues(x.closedBy, action.payload.data)
                }
            })
        case CHANGE_CLOSED_BY_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    closedBy: updateInclude(x.closedBy, action.payload.data)
                }
            })


        case CHANGE_FIXED_BETWEEN:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    fixedBetween: updateValues(x.fixedBetween, action.payload.data)
                }
            })
        case CHANGE_FIXED_BETWEEN_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    fixedBetween: updateInclude(x.fixedBetween, action.payload.data)
                }
            })


        case CHANGE_ASSIGNED_TO:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    assignedTo: updateValues(x.assignedTo, action.payload.data)
                }
            })
        case CHANGE_ASSIGNED_TO_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    assignedTo: updateInclude(x.assignedTo, action.payload.data)
                }
            })


        case CHANGE_FIXED_BY:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    fixedBy: updateValues(x.fixedBy, action.payload.data)
                }
            })
        case CHANGE_FIXED_BY_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    fixedBy: updateInclude(x.fixedBy, action.payload.data)
                }
            })


        default:
            return sets
    }
}

function updateTicketStatusesValues(set: Set, newTicketStatuses: Array<string> | undefined) {
    const ticketStatuses = updateValues(set.ticketStatuses, newTicketStatuses)
    return tryGetClosedFreeState(set, ticketStatuses)
}

function updateTicketStatusesInclude(set: Set, newTicketStatusesInclude: boolean) {
    const ticketStatuses = updateInclude(set.ticketStatuses, newTicketStatusesInclude)
    return tryGetClosedFreeState(set, ticketStatuses)
}

function tryGetClosedFreeState(set: Set, ticketStatuses: FilterParametersNode<string> | undefined) {
    if (closedIsNotSelected(ticketStatuses)) {
        return {
            ...set,
            ticketStatuses: ticketStatuses,
            closedBy: undefined,
            closedBetween: undefined,
        }
    }
    return {
        ...set,
        ticketStatuses: ticketStatuses,
    }
}
