import FetchResult from '../../common/Interfaces'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'

export interface Position {
    name: string
}

export async function fetchPositions(): Promise<FetchResult<Array<Position>>> {
    try {
        const values = await fetch(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Positions`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Position>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Position>()
        }
    }
}
