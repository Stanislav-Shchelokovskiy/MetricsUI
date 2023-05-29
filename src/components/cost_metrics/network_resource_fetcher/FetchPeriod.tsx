import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

interface PeriodRaw {
    start: string
    end: string
}

export type Period = [string, string]

function converter(value: PeriodRaw | undefined): Period {
    if (value)
        return [value.start, value.end]
    return ['', '']
}

export async function fetchPeriod(): Promise<FetchResult<Period>> {
    return fetchConvert(converter, `${SUPPORT_METRICS_END_POINT}/CostMetrics/Period`)
}
