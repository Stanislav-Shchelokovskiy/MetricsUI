import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { anyValueIsEmpty } from '../store/Utils'



export async function fetchPeriodsArray(
    groupByPeriod: string,
    rangeStart: string,
    rangeEnd: string,
): Promise<FetchResult<Array<string>>> {
    if (anyValueIsEmpty(groupByPeriod, rangeStart, rangeEnd))
        return {
            success: true,
            data: []
        }
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
