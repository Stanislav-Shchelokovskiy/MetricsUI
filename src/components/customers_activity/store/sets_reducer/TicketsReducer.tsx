import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import { 
    updateSetState,
    updateValues,
    updateInclude
} from '../../../common/store/multiset_container/sets/Utils'
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
    CHANGE_TICKETS_TAGS,
    CHANGE_TICKETS_TAGS_INCLUDE,
} from '../actions/Tickets'


export function ticketsReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_PRIVACY:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    privacy: action.payload.data === undefined ? undefined : {
                        include: true,
                        value: action.payload.data,
                    },
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
                    ticketsTags: updateInclude(x.ticketsTags, action.payload.data)
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
                    versions: updateInclude(x.versions, action.payload.data)
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
                    ides: updateInclude(x.ides, action.payload.data)
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
                    operatingSystems: updateInclude(x.operatingSystems, action.payload.data)
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
                    frameworks: updateInclude(x.frameworks, action.payload.data)
                }
            })


        default:
            return sets
    }
}
