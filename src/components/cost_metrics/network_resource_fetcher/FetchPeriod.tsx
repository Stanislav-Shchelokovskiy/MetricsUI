import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'

interface PeriodRaw {
    start: string
    end: string
}

export type Period = [string, string]

function converter(value: PeriodRaw | undefined) {
    if (value)
        return [value.start, value.end]
    return ['', '']
}

export async function fetchPeriod(): Promise<FetchResult<Period>> {
    try {
        const period = await fetch(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Period`).then(response => response.json()) as PeriodRaw
        return {
            success: true,
            data: [period.start, period.end]
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: ['', '']
        }
    }
}
