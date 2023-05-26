import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Feature {
    feature_id: string
    feature_name: string
}

export async function fetchFeatures(
    tents: FilterParametersNode<string>,
    components: FilterParametersNode<string>
): Promise<FetchResult<Array<Feature>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_features`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tents: tents,
                    components: components,
                }),
            }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Feature>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Feature>()
        }
    }
}
