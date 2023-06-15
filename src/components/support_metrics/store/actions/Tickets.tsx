import { getPayloadAction } from '../../../common/store/Actions'
import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_VERSIONS = 'customers_activity/change_versions'
export const changeVersions = getValuesPayloadAction<string>(CHANGE_VERSIONS)

export const CHANGE_VERSIONS_INCLUDE = 'customers_activity/change_versions_include'
export const changeVersionsInclude = getIncludePayloadAction(CHANGE_VERSIONS_INCLUDE)


export const CHANGE_IDEs = 'customers_activity/change_IDEs'
export const changeIDEs = getValuesPayloadAction<string>(CHANGE_IDEs)

export const CHANGE_IDEs_INCLUDE = 'customers_activity/change_IDEs_include'
export const changeIDEsInclude = getIncludePayloadAction(CHANGE_IDEs_INCLUDE)


export const CHANGE_OPERATING_SYSTEMS = 'customers_activity/change_operating_systems'
export const changeOperatingSystems = getValuesPayloadAction<string>(CHANGE_OPERATING_SYSTEMS)

export const CHANGE_OPERATING_SYSTEMS_INCLUDE = 'customers_activity/change_operating_systems_include'
export const changeOperatingSystemsInclude = getIncludePayloadAction(CHANGE_OPERATING_SYSTEMS_INCLUDE)


export const CHANGE_FRAMEWORKS = 'customers_activity/change_frameworks'
export const changeFrameworks = getValuesPayloadAction<string>(CHANGE_FRAMEWORKS)

export const CHANGE_FRAMEWORKS_INCLUDE = 'customers_activity/change_frameworks_include'
export const changeFrameworksInclude = getIncludePayloadAction(CHANGE_FRAMEWORKS_INCLUDE)


export const CHANGE_PRIVACY = 'customers_activity/change_privacy'
export const changePrivacy = getPayloadAction<number | undefined>(CHANGE_PRIVACY)


export const CHANGE_TICKETS_TAGS = 'customers_activity/change_tickets_tags'
export const changeTicketsTags = getValuesPayloadAction<string>(CHANGE_TICKETS_TAGS)

export const CHANGE_TICKETS_TAGS_INCLUDE = 'customers_activity/change_tickets_tags_include'
export const changeTicketsTagsInclude = getIncludePayloadAction(CHANGE_TICKETS_TAGS_INCLUDE)
