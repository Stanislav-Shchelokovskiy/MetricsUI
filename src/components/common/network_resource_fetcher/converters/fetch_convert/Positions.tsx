import { SUPPORT_METRICS_END_POINT } from '../../../EndPoint'
import FetchResult from '../../../Typing'
import { fetchArray } from '../../../network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../store/multiset_container/sets/Interfaces'

export async function positionsNamesToIDS(positionNames: FilterParametersNode<string>): Promise<FetchResult<FilterParametersNode<string>>> {
    const positions: { [name: string]: string } = {
        'Support Developer PH': '10D4EC1A-8EEA-4930-A88B-76D0CAC11E89',
        'Support Developer': '7A8E1B05-385E-4C91-B61E-81446B0C404A',
    }
    return {
        success: true,
        data: {
            ...positionNames,
            values: positionNames.values.map(x => positions[x])
        }

    }

    // return fetchArray(
    //     `${SUPPORT_METRICS_END_POINT}/ValidateCustomers`,
    //     {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ names: positionNames }),
    //     }
    // )
}