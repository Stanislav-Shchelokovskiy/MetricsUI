import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'


export interface Employee {
    scid: string
    name: string
}

export async function fetchEmployees(
    positions: FilterParametersNode<string>,
    tribes: FilterParametersNode<string>,
    tents: FilterParametersNode<string>,
): Promise<FetchResult<Array<Employee>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/Employees`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                positions: positions,
                tribes: tribes,
                tents: tents,
            }),
        }
    )
}
