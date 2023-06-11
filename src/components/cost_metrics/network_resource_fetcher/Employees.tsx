import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../common/store/multiset_container/sets/Interfaces'

export interface Employee {
    name: string
}

export async function fetchEmployees(
    tribes: FilterParametersNode<string>,
    positions: FilterParametersNode<string>,
): Promise<FetchResult<Array<Employee>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/CostMetrics/Employees`,
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
