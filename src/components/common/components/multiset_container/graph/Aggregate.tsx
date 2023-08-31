import { Agg } from './ComparisonGraph'

export interface Aggregate {
    period: string
    agg: number
    name: string
}

export const EMPTY_AGGREGATES = {
    periods: [],
    aggs: [],
    customdata: [],
}

export function getAggregatesConverter(setTitle: string) {
    return (aggregates: Array<Aggregate> | undefined): Agg => {
        return {
            name: setTitle,
            ...aggregatesConverter(aggregates),
        }
    }
}
function aggregatesConverter(aggregates: Array<Aggregate> | undefined) {
    if (aggregates) {
        const periods = []
        const aggs = []
        for (const agg of aggregates) {
            periods.push(agg.period)
            aggs.push(agg.agg)
        }
        return {
            periods: periods,
            aggs: aggs,
            customdata: []
        }
    }
    return EMPTY_AGGREGATES
}
