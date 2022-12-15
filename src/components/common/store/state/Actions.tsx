import { PayloadAction } from '@reduxjs/toolkit'

export const APPLY_STATE = 'apply_state'
export const applyState = (state: any): PayloadAction<any> => {
    return {
        type: APPLY_STATE,
        payload: state
    }
}

export const REGISTER_STATE = 'register_state'
export const registerState = (state_key: string): PayloadAction<string> => {
    return {
        type: REGISTER_STATE,
        payload: state_key
    }
}

export const DROP_STATE = 'drop_state'
export const dropState = (state_key: string): PayloadAction<string> => {
    return {
        type: DROP_STATE,
        payload: state_key
    }
}

export const CHANGE_STATE = 'change_state'
export const changeState = (state_key: string): PayloadAction<string> => {
    return {
        type: CHANGE_STATE,
        payload: state_key
    }
}
