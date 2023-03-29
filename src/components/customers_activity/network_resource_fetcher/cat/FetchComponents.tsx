import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/sets_reducer/Interfaces'
import { allNodesAreConsideredEmpty } from '../../store/Utils'

export interface Component {
    component_id: string
    component_name: string
}

export async function fetchComponents(tribes: FilterParametersNode<string>): Promise<FetchResult<Array<Component>>> {
    if (allNodesAreConsideredEmpty(tribes)) {
        return {
            success: true,
            data: Array<Component>()
        }
    }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_components`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tribes: tribes,
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
