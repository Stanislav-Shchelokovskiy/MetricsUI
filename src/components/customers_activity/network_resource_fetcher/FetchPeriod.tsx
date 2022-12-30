import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'


export interface Period {
    period_start: string
    period_end: string
}


export async function fetchPeriod(): Promise<FetchResult<Period>> {
    try {
        const period = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_period`).then(response => response.json())
        return {
            success: true,
            data: period as Period
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: { period_start: '', period_end: '' }
        }
    }
}
