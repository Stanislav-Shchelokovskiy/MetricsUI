import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Component {
    tribeId: string
    component_id: string
    component_name: string
}


export const fetchComponents: (tribe_ids: Array<string>) => Promise<FetchResult<Array<Component>>> = async function (tribe_ids: Array<string>) {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_components`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tribes: tribe_ids,
            }),
        }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Component>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Component>()
        }
    }
}
