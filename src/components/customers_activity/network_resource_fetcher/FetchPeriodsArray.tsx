import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'



export async function fetchPeriodsArray(groupByPeriod: string,
    rangeStart: string,
    rangeEnd: string,
): Promise<FetchResult<Array<string>>> {
    try {
        const periods = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_periods_array?` +
            `start=${rangeStart}` +
            `&end=${rangeEnd}` +
            `&format=${groupByPeriod}`
        ).then(response => response.json())
        return {
            success: true,
            data: periods as Array<string>
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: []
        }
    }
}
