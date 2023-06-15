import { getPayloadAction, getAction } from '../Actions'

export const APPLY_STATE = 'apply_state'
export const applyState = getPayloadAction<any>(APPLY_STATE)

export const REGISTER_STATE = 'register_state'
export const registerState = getAction<string>(REGISTER_STATE)

export const DROP_STATE = 'drop_state'
export const dropState = getPayloadAction<string>(DROP_STATE)

export const CHANGE_STATE = 'change_state'
export const changeState = getPayloadAction<string>(CHANGE_STATE)
