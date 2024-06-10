import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { StringFilterParameters } from '../../common/store/multiset_container/sets/Interfaces'

export async function fetchEmployees(
    teams: StringFilterParameters,
    tribes: StringFilterParameters,
    tents: StringFilterParameters,
    positions: StringFilterParameters,
): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(
        `${COST_METRICS_END_POINT}/CostMetrics/Employees`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Teams: teams,
                Tribes: tribes,
                Tents: tents,
                Positions: positions,
            }),
        }
    )
}
