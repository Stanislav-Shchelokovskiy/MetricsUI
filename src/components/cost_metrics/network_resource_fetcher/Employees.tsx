import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
//import { FilterParametersNode } from '../../common/store/set_container/sets/Interfaces'


export interface Employee {
    name: string
    tribe: string
}

export async function fetchEmployees(
    // positions: FilterParametersNode<string>,
    // tribes: FilterParametersNode<string>,
    // tents: FilterParametersNode<string>,
): Promise<FetchResult<Array<Employee>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/CostMetrics/Employees`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({
            //     positions: positions,
            //     tribes: tribes,
            //     tents: tents,
            // }),
        }
    )
}
