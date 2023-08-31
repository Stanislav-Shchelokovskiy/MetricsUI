import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets/SetsReducer'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { toDate } from '../../common/Utils'

interface RawData {
    date: any
    [index: string]: any
}

export async function fetchRaw(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<Array<RawData>>> {
    const [rangeStart, rangeEnd] = containerState.range
    return fetchConvert(converter, `${PERFORMANCE_METRICS_END_POINT}/Raw?` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
            }),
        })
}

function converter(values: Array<RawData> | undefined): Array<RawData> {
    return values ? values.map(r => {
        r.date = toDate(r.date)
        return r
    }) : Array<RawData>()
}
