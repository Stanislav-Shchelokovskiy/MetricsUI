import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from '../../../common/store/set_container/sets/Actions'

export const CHANGE_TICKETS_TYPES = 'customers_activity/change_tickets_types'
export const changeTicketsTypes = getValuesPayloadAction<number>(CHANGE_TICKETS_TYPES)

export const CHANGE_TICKETS_TYPES_INCLUDE = 'customers_activity/change_tickets_types_include'
export const changeTicketsTypesInclude = getIncludePayloadAction(CHANGE_TICKETS_TYPES_INCLUDE)


export const CHANGE_DUPLICATED_TO_TICKETS_TYPES = 'customers_activity/change_duplicated_to_tickets_types'
export const changeDuplicatedToTicketTypes = getValuesPayloadAction<number>(CHANGE_DUPLICATED_TO_TICKETS_TYPES)

export const CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE = 'customers_activity/change_duplicated_to_tickets_types_include'
export const changeDuplicatedToTicketsTypesInclude = getIncludePayloadAction(CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE)
