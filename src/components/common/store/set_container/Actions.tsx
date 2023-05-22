import { getAction } from '../Actions'
import { getPayloadAction } from '../Actions'

export const ADD_SET = 'add_set'
export const addSet = getAction<string>(ADD_SET)

export const REMOVE_SET = 'remove_set'
export const removeSet = getAction<string>(REMOVE_SET)

export const CHANGE_SET_TITLE = 'change_set_title'
export const changeSetTitle = getPayloadAction<string>(CHANGE_SET_TITLE)

export const HIDE_LEGENDS = 'hide_legends'
export const hideLegends = getAction<Array<string>>(HIDE_LEGENDS)
