import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/sets_reducer/Interfaces'
import { allNodesAreConsideredEmpty } from '../../store/Utils'

export interface Platform {
    platform_id: string
    platform_name: string
}

export async function fetchPlatforms(tents: FilterParametersNode<string>): Promise<FetchResult<Array<Platform>>> {
    if (allNodesAreConsideredEmpty(tents)) {
        return {
            success: true,
            data: Array<Platform>()
        }
    }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_platforms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tents: tents, }),
        }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Platform>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Platform>()
        }
    }
}
