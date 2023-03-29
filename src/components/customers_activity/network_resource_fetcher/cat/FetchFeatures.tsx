import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/sets_reducer/Interfaces'
import { anyNodeIsConsideredEmpty } from '../../store/Utils'

export interface Feature {
    feature_id: string
    feature_name: string
}

export async function fetchFeatures(
    tribes: FilterParametersNode<string>,
    components: FilterParametersNode<string>
): Promise<FetchResult<Array<Feature>>> {
    if (anyNodeIsConsideredEmpty(tribes, components)) {
        return {
            success: true,
            data: Array<Feature>()
        }
    }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_features`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tribes: tribes,
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
