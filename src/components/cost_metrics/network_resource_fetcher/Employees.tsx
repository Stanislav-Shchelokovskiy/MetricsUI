import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../common/store/multiset_container/sets/Interfaces'

export async function fetchEmployees(
    tribes: FilterParametersNode<string>,
    positions: FilterParametersNode<string>,
): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(
        `${COST_METRICS_END_POINT}/CostMetrics/Employees`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tribes: tribes,
                positions: positions,
            }),
        }
    )
}
