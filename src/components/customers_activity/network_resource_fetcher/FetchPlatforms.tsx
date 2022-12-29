import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { anyDependencyIsEmpty } from '../../common/components/Utils'


export interface Platform {
    platform_id: string
    platform_name: string
}


export const fetchPlatforms: (tribe_ids: Array<string>) => Promise<FetchResult<Array<Platform>>> = async function (tribe_ids: Array<string>) {
    if (anyDependencyIsEmpty(tribe_ids)) {
        return {
            success: true,
            data: Array<Platform>()
        }
    }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_platforms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tribes: tribe_ids,
            }),
        }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Platform>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Platform>()
        }
    }
}
