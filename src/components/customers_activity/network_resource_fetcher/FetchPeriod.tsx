import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

interface PeriodRaw {
    period_start: string
    period_end: string
}

export type Period = [string, string]

function converter(periodRaw: Array<PeriodRaw> | undefined): Period {
    if (periodRaw) {
        const period = periodRaw[0]
        return [period.period_start, period.period_end]
    }
    return ['', '']
}

export async function fetchPeriod(): Promise<FetchResult<Period>> {
    return fetchConvert(converter, `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_period`)
}
