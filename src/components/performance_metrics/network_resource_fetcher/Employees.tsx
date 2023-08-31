import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import {
    FilterParametersNode,
    FilterParameterNode,
} from '../../common/store/multiset_container/sets/Interfaces'

export async function fetchEmployees(
    tents: FilterParametersNode<string>,
    positions: FilterParametersNode<string>,
    trainee: FilterParameterNode<boolean> | undefined,
    junior: FilterParameterNode<boolean> | undefined,
): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(
        `${PERFORMANCE_METRICS_END_POINT}/Employees`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'Employees Tents': tents,
                Positions: positions,
                Trainee: trainee,
                Junior: junior,
            }),
        }
    )
}
