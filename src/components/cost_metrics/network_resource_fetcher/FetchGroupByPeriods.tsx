import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'

export interface GroupByPeriod {
    name: string
    format: string
}

export async function fetchGroupByPeriods(): Promise<FetchResult<Array<GroupByPeriod>>> {
    try {
        const values = await fetch(`${SUPPORT_METRICS_END_POINT}/GroupByPeriods`).then(response => response.json())
        return {
            success: true,
            data: values as Array<GroupByPeriod>
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<GroupByPeriod>()
        }
    }
}
