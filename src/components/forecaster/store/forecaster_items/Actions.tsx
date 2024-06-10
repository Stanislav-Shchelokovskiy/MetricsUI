import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Typing'

export const EXPAND_FORECAST_ITEMS = 'expand_forecast_items'
export const expandForecastItems = (tribeId: string, expandedItems: Array<string>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: EXPAND_FORECAST_ITEMS,
        payload: { stateId: tribeId, data: expandedItems }
    }
}
