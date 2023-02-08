import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Version {
    id: string
}


export async function fetchVersions(): Promise<FetchResult<Array<Version>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_builds`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Version>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Version>()
        }
    }
}
