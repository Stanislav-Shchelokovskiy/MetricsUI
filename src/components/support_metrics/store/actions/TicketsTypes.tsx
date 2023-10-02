import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_TICKETS_TYPES = 'change_tickets_types'
export const changeTicketsTypes = getValuesPayloadAction<number>(CHANGE_TICKETS_TYPES)

export const CHANGE_TICKETS_TYPES_INCLUDE = 'change_tickets_types_include'
export const changeTicketsTypesInclude = getIncludePayloadAction(CHANGE_TICKETS_TYPES_INCLUDE)


export const CHANGE_DUPLICATED_TO_TICKETS_TYPES = 'change_duplicated_to_tickets_types'
export const changeDuplicatedToTicketTypes = getValuesPayloadAction<number>(CHANGE_DUPLICATED_TO_TICKETS_TYPES)

export const CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE = 'change_duplicated_to_tickets_types_include'
export const changeDuplicatedToTicketsTypesInclude = getIncludePayloadAction(CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE)
