import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'


export interface TicketsTag {
    id: number
    name: string
}


export async function fetchTicketsTags(): Promise<FetchResult<Array<TicketsTag>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_tickets_tags`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<TicketsTag>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<TicketsTag>()
        }
    }
}
