import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Component {
    component_id: string
    component_name: string
}

export async function fetchComponents(tents: FilterParametersNode<string>): Promise<FetchResult<Array<Component>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_components`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tents: tents,
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
