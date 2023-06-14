import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

interface RawDailyTribeReplies {
    tent_belonging_status: number
    tent_name: string
    position_name: string
    name: string
    user_display_name: string
    crmid: string
    reply_date: Array<string>
    iterations: Array<number>
}

export interface DailyTribeReplies {
    tent_belonging_status: number
    tent_name: string
    position_name: string
    name: string
    user_display_name: string
    crmid: string
    reply_date: Array<Date>
    iterations: Array<number>
}

export const EMPTY_DAILY_TENT_REPLIES = [{
    tent_belonging_status: 0,
    tent_name: '',
    position_name: '',
    name: '',
    user_display_name: '',
    crmid: '',
    reply_date: Array<Date>(),
    iterations: Array<number>()
}]

function convert(rawDailyTribeReplies: Array<RawDailyTribeReplies> | undefined): Array<DailyTribeReplies> {
    if (rawDailyTribeReplies)
        return rawDailyTribeReplies.map((replies) => {
            return {
                ...replies,
                reply_date: replies.reply_date.map(dt => new Date(dt)),
            }
        })
    return EMPTY_DAILY_TENT_REPLIES
}

export async function FetchDailyTentReplies(tile: number, tentId: string, forecastHorizon: string): Promise<FetchResult<Array<DailyTribeReplies>>> {
    return fetchConvert(convert,
        `${FORECASTER_END_POINT}/tent_replies?` +
        new URLSearchParams({
            tile: tile.toString(),
            tent_id: tentId,
            horizon: forecastHorizon,
        })
    )
}
