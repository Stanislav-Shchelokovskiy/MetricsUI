import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from './Actions'

export const CHANGE_TRIBES = 'change_tribes'
export const changeTribes = getValuesPayloadAction<string>(CHANGE_TRIBES)

export const CHANGE_TRIBES_INCLUDE = 'change_tribes_include'
export const changeTribesInclude = getIncludePayloadAction(CHANGE_TRIBES_INCLUDE)

export const CHANGE_TENTS = 'change_tents'
export const changeTents = getValuesPayloadAction<string>(CHANGE_TENTS)

export const CHANGE_TENTS_INCLUDE = 'change_tents_include'
export const changeTentsInclude = getIncludePayloadAction(CHANGE_TENTS_INCLUDE)
