import FORECASTER_END_POINT from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'


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


export const EMPTY_DAILY_TRIBE_REPLIES: FetchResult<Array<DailyTribeReplies>> =
{
    success: false,
    data: [{
        tribe_belonging_status: 0,
        user_tribe_name: '',
        position_name: '',
        user_name: '',
        user_display_name: '',
        user_id: '',
        reply_date: Array<Date>(),
        iteration_count: Array<number>()
    }]
}


export const FetchDailyTribeReplies: (tile: number, tribeId: string, forecastHorizon: string) => Promise<FetchResult<Array<DailyTribeReplies>>> =
    async function (tile: number, tribeId: string, forecastHorizon: string) {
        try {
            const rawDailyTribeReplies: Array<RawDailyTribeReplies> = await fetch(
                `${FORECASTER_END_POINT}/get_tribe_replies?` +
                new URLSearchParams({
                    tile: tile.toString(),
                    tribe_id: tribeId,
                    horizon: forecastHorizon,
                })
            ).then(response => response.json())

            const dailyTribeReplies = rawDailyTribeReplies.map((replies) => {
                return {
                    tribe_belonging_status: (replies.tribe_belonging_status as number),
                    user_tribe_name: replies.user_tribe_name,
                    position_name: replies.position_name,
                    user_name: replies.user_name,
                    user_display_name: replies.user_display_name,
                    user_id: replies.user_id,
                    reply_date: replies.reply_date.map(dt => new Date(dt)),
                    iteration_count: replies.iteration_count,
                }
            })

            return {
                success: true,
                data: dailyTribeReplies
            }
        } catch (error) {
            console.log(error)
            return EMPTY_DAILY_TRIBE_REPLIES
        }
    }
