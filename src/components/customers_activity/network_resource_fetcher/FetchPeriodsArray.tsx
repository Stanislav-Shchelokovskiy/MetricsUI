import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { ContainerState } from '../store/ContainerReducer'
import { anyValueIsEmpty } from '../../common/store/multiset_container/sets/Utils'

export async function fetchPeriodsArray(containerState: ContainerState): Promise<FetchResult<Array<string>>> {
    const [rangeStart, rangeEnd] = containerState.range
    if (anyValueIsEmpty(containerState.groupByPeriod, rangeStart, rangeEnd))
        return {
            success: true,
            data: []
        }
    try {
        let periods = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_periods_array?` +
            `start=${rangeStart}` +
            `&end=${rangeEnd}` +
            `&format=${containerState.groupByPeriod}`
        ).then(response => response.json())
        if (containerState.baselineAlignedModeEnabled)
            periods = (periods as Array<string>).map((x, index) => (index + 1).toString())
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
