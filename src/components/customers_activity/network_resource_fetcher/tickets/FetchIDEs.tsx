import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'

export interface IDE {
    id: string
    name: string
}

export async function fetchIDEs(): Promise<FetchResult<Array<IDE>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_ides`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<IDE>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<IDE>()
        }
    }
}
