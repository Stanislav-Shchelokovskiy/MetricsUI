import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

interface RawDailyTribeReplies {
    tribe_belonging_status: number
    user_tribe_name: string
    position_name: string
    user_name: string
    user_display_name: string
    user_id: string
    reply_date: Array<string>
    iteration_count: Array<number>
}

export interface DailyTribeReplies {
    tribe_belonging_status: number
    user_tribe_name: string
    position_name: string
    user_name: string
    user_display_name: string
    user_id: string
    reply_date: Array<Date>
    iteration_count: Array<number>
}

export const EMPTY_DAILY_TRIBE_REPLIES = [{
    tribe_belonging_status: 0,
    user_tribe_name: '',
    position_name: '',
    user_name: '',
    user_display_name: '',
    user_id: '',
    reply_date: Array<Date>(),
    iteration_count: Array<number>()
}]

function convert(rawDailyTribeReplies: Array<RawDailyTribeReplies> | undefined): Array<DailyTribeReplies> {
    if (rawDailyTribeReplies)
        return rawDailyTribeReplies.map((replies) => {
            return {
                ...replies,
                reply_date: replies.reply_date.map(dt => new Date(dt)),
            }
        })
    return EMPTY_DAILY_TRIBE_REPLIES
}

export async function FetchDailyTribeReplies(tile: number, tribeId: string, forecastHorizon: string): Promise<FetchResult<Array<DailyTribeReplies>>> {
    return fetchConvert(convert,
        `${FORECASTER_END_POINT}/get_tribe_replies?` +
        new URLSearchParams({
            tile: tile.toString(),
            tribe_id: tribeId,
            horizon: forecastHorizon,
        })
    )
}
