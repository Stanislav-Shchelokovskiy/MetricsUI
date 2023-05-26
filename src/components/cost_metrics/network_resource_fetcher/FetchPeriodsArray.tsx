import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { BaseContainerState } from '../../common/store/multiset_container/Interfaces'
import { anyValueIsEmpty } from '../../common/store/multiset_container/sets/Utils'

export async function fetchPeriodsArray(containerState: BaseContainerState): Promise<FetchResult<Array<string>>> {
    const [rangeStart, rangeEnd] = containerState.range
    if (anyValueIsEmpty(containerState.groupByPeriod, rangeStart, rangeEnd))
        return {
            success: true,
            data: []
        }
    try {
        let periods = await fetch(`${SUPPORT_METRICS_END_POINT}/PeriodsArray?` +
            `start=${rangeStart}` +
            `&end=${rangeEnd}` +
            `&format=${containerState.groupByPeriod}`
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
