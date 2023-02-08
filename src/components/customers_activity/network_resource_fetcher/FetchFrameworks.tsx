import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Framework {
    id: string
    name: string
}


export async function FetchFrameworks(): Promise<FetchResult<Array<Framework>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_frameworks`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Framework>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Framework>()
        }
    }
}
