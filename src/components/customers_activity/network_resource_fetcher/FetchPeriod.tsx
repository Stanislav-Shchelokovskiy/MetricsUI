import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'

interface PeriodRaw {
    period_start: string
    period_end: string
}

export type Period = [string, string]

export async function fetchPeriod(): Promise<FetchResult<Period>> {
    try {
        const period = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_period`).then(response => response.json()) as PeriodRaw
        return {
            success: true,
            data: [period.period_start, period.period_end]
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: ['', '']
        }
    }
}
