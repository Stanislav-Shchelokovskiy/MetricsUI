import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { ContainerState } from '../store/ContainerReducer'
import { anyValueIsEmpty } from '../../common/store/multiset_container/sets/Utils'

export async function fetchPeriodsArray(containerState: ContainerState): Promise<FetchResult<Array<string>>> {
    const [rangeStart, rangeEnd] = containerState.range
    if (anyValueIsEmpty(containerState.groupByPeriod, rangeStart, rangeEnd))
        return {
            success: true,
            data: []
        }
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/PeriodsArray?` +
        `start=${rangeStart}` +
        `&end=${rangeEnd}` +
        `&format=${containerState.groupByPeriod}`
    )
}
