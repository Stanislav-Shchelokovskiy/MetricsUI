import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'

export interface TicketStatus {
    id: string
    name: string
}

export async function fetchTicketStatuses(): Promise<FetchResult<Array<TicketStatus>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_ticket_statuses`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<TicketStatus>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<TicketStatus>()
        }
    }
}
