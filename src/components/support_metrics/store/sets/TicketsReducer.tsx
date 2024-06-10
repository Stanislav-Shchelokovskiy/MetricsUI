import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import {
    updateSetState,
    updateValues,
    updateValuesInclude
} from '../../../common/store/multiset_container/Utils'
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
    CHANGE_OWNER_KIND,
    CHANGE_CLOSED_FOR,
    CHANGE_RESOLUTION_TIME,
    CHANGE_TICKETS_TAGS,
    CHANGE_TICKETS_TAGS_INCLUDE,
} from '../actions/Tickets'
import { getOptionalFilterParameter } from '../../../common/store/multiset_container/sets/Defaults'


export function ticketsReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_PRIVACY:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    privacy: getOptionalFilterParameter(action.payload.data),
                }
            })

        case CHANGE_OWNER_KIND:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    ownerKind: getOptionalFilterParameter(action.payload.data),
                }
            })

        case CHANGE_CLOSED_FOR:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    closedForInDays: getOptionalFilterParameter(action.payload.data),
                }
            })

        case CHANGE_RESOLUTION_TIME:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    resolutionTimeInhours: updateValues(x.resolutionTimeInhours, action.payload.data),
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
                    ticketsTags: updateValuesInclude(x.ticketsTags, action.payload.data)
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
                    versions: updateValuesInclude(x.versions, action.payload.data)
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
                    ides: updateValuesInclude(x.ides, action.payload.data)
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
                    operatingSystems: updateValuesInclude(x.operatingSystems, action.payload.data)
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
                    frameworks: updateValuesInclude(x.frameworks, action.payload.data)
                }
            })


        default:
            return sets
    }
}
