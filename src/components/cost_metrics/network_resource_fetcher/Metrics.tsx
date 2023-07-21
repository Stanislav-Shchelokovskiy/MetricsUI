import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray, fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
import { HelpItem } from '../../common/Interfaces'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${COST_METRICS_END_POINT}/CostMetrics/Metrics`)
}


function converter(value: HelpItem | undefined): HelpItem {
    if (value)
        return value
    return {
        title: '',
        content: ''
    }
}

export async function fetchMetricDesc(metric: string): Promise<FetchResult<HelpItem>> {
    return fetchConvert(converter,
        `${COST_METRICS_END_POINT}/CostMetrics/MetricDescription?` +
        `metric=${metric}`
    )
}
