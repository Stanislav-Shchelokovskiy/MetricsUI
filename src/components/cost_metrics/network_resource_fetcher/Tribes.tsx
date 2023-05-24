import FetchResult from '../../common/Interfaces'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'

export interface Tribe {
    name: string
}

export async function fetchTribes(): Promise<FetchResult<Array<Tribe>>> {
    try {
        const values = await fetch(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Tribes`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Tribe>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Tribe>()
        }
    }
}
