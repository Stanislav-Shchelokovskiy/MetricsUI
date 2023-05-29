import FetchResult from '../../common/Interfaces'

export interface Metric {
    name: string
}

const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'
const PEOPLE = 'People'
const ITERATIONS_TO_TICKETS = 'Iterations / Tickets'
const metrics = [{ name: TICKETS }, { name: ITERATIONS }, { name: ITERATIONS_TO_TICKETS }, { name: PEOPLE }]

export const isTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === TICKETS
}

export const isIterationsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === ITERATIONS
}

export const isIterationsToTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === ITERATIONS_TO_TICKETS
}

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return {
        success: true,
        data: metrics
    }
}
