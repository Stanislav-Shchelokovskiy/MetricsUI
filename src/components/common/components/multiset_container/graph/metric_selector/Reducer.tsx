import { PayloadAction } from '@reduxjs/toolkit'
import { Undefinable } from '../../../../Typing'
import { getAction } from '../../../../store/Actions'
import { Metric } from './Metric'
import { MetricsPopupProps } from './Popup'


const CHANGE_METRIC = 'change_metric'
export const changeMetric = getAction<Metric>(CHANGE_METRIC)

const CHANGE_POPUP_PROPS = 'change_popup_props'
export const openCustomPopup = getAction<Undefinable<MetricsPopupProps<Metric, string>>>(CHANGE_POPUP_PROPS)

const CHANGE_DEFAULT_OPENED = 'change_default_opened'
export const openDefaultPopup = getAction<boolean>(CHANGE_DEFAULT_OPENED)

const HIDE_POPUP = 'hide_popup'
export const hidePopup = getAction<undefined>(HIDE_POPUP)

interface State {
    metric?: Metric
    popupProps?: MetricsPopupProps<Metric, string>
    defaultPopupOpened: boolean
}

export const INITIAL_STATE = {
    metric: undefined,
    popupProps: undefined,
    defaultPopupOpened: false,
}

export function stateReducer(state: State, action: PayloadAction<any>): State {
    switch (action.type) {

        case CHANGE_METRIC:
            return {
                ...state,
                metric: action.payload,
            }

        case CHANGE_POPUP_PROPS:
            return {
                ...state,
                popupProps: action.payload,
            }

        case CHANGE_DEFAULT_OPENED:
            return {
                ...state,
                defaultPopupOpened: action.payload,
            }

        case HIDE_POPUP: {
            return {
                ...state,
                popupProps: undefined,
                defaultPopupOpened: false,
            }
        }

        default:
            return state
    }
}
