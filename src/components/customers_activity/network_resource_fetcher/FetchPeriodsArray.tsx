import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { anyValueIsEmpty } from '../store/Utils'

interface Period {
    period: string
}

export async function fetchPeriodsArray(
    groupByPeriod: string,
    rangeStart: string,
    rangeEnd: string,
    baselineAlignedModeEnabled: boolean,
): Promise<FetchResult<Array<string>>> {
    if (anyValueIsEmpty(groupByPeriod, rangeStart, rangeEnd))
        return {
            success: true,
            data: []
        }
    try {
        let periods = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_periods_array?` +
            `start=${rangeStart}` +
            `&end=${rangeEnd}` +
            `&format=${groupByPeriod}`
        ).then(response => response.json())
        if (baselineAlignedModeEnabled)
            periods = (periods as Array<Period>).map((x, index) => (index + 1).toString())
        return {
            success: true,
            data: (periods as Array<Period>).map(x => x.period)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: []
        }
    }
}
