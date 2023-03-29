import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'

export interface OS {
    id: string
    name: string
}

export async function fetchOperatingSystems(): Promise<FetchResult<Array<OS>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_operating_systems`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<OS>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<OS>()
        }
    }
}
