import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { StringFilterParameters, NumberFilterParameters } from '../../common/store/multiset_container/sets/Interfaces'

export async function fetchEmployees(
    tents: StringFilterParameters,
    positions: StringFilterParameters,
    levels: NumberFilterParameters,
): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(
        `${PERFORMANCE_METRICS_END_POINT}/Employees`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'Employees Tents': tents,
                Positions: positions,
                Levels: levels,
            }),
        }
    )
}
