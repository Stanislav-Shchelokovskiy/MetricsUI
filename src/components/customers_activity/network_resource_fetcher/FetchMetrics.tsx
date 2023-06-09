import FetchResult from '../../common/Interfaces'

export interface Metric {
    name: string
}

const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'
const PEOPLE = 'People'
const ITERATIONS_TO_TICKETS = 'Iterations / Tickets'
const metrics = [{ name: TICKETS }, { name: ITERATIONS }, { name: ITERATIONS_TO_TICKETS }, { name: PEOPLE }]

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return {
        success: true,
        data: metrics
    }
}
