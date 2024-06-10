import { getPayloadAction } from '../../../common/store/Actions'
import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_VERSIONS = 'change_versions'
export const changeVersions = getValuesPayloadAction<string>(CHANGE_VERSIONS)

export const CHANGE_VERSIONS_INCLUDE = 'change_versions_include'
export const changeVersionsInclude = getIncludePayloadAction(CHANGE_VERSIONS_INCLUDE)


export const CHANGE_IDEs = 'change_IDEs'
export const changeIDEs = getValuesPayloadAction<string>(CHANGE_IDEs)

export const CHANGE_IDEs_INCLUDE = 'change_IDEs_include'
export const changeIDEsInclude = getIncludePayloadAction(CHANGE_IDEs_INCLUDE)


export const CHANGE_OPERATING_SYSTEMS = 'change_operating_systems'
export const changeOperatingSystems = getValuesPayloadAction<string>(CHANGE_OPERATING_SYSTEMS)

export const CHANGE_OPERATING_SYSTEMS_INCLUDE = 'change_operating_systems_include'
export const changeOperatingSystemsInclude = getIncludePayloadAction(CHANGE_OPERATING_SYSTEMS_INCLUDE)


export const CHANGE_FRAMEWORKS = 'change_frameworks'
export const changeFrameworks = getValuesPayloadAction<string>(CHANGE_FRAMEWORKS)

export const CHANGE_FRAMEWORKS_INCLUDE = 'change_frameworks_include'
export const changeFrameworksInclude = getIncludePayloadAction(CHANGE_FRAMEWORKS_INCLUDE)


export const CHANGE_PRIVACY = 'change_privacy'
export const changePrivacy = getPayloadAction<number | undefined>(CHANGE_PRIVACY)

export const CHANGE_OWNER_KIND = 'change_owner_kind'
export const changeOwnerKind = getPayloadAction<number | undefined>(CHANGE_OWNER_KIND)

export const CHANGE_CLOSED_FOR = 'change_closed_for'
export const changeClosedFor = getPayloadAction<number | undefined>(CHANGE_CLOSED_FOR)

export const CHANGE_RESOLUTION_TIME = 'change_resolution_timme'
export const changeResolutionTime = getValuesPayloadAction<number>(CHANGE_RESOLUTION_TIME)

export const CHANGE_TICKETS_TAGS = 'change_tickets_tags'
export const changeTicketsTags = getValuesPayloadAction<string>(CHANGE_TICKETS_TAGS)

export const CHANGE_TICKETS_TAGS_INCLUDE = 'change_tickets_tags_include'
export const changeTicketsTagsInclude = getIncludePayloadAction(CHANGE_TICKETS_TAGS_INCLUDE)
