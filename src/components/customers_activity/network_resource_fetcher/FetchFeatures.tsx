import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { anyDependencyIsEmpty } from '../../common/components/Utils'


export interface Feature {
    feature_id: string
    feature_name: string
}


export const fetchFeatures: (tribe_ids: Array<string>, component_ids: Array<string>) => Promise<FetchResult<Array<Feature>>> =
    async function (tribe_ids: Array<string>, component_ids: Array<string>,) {
        if (anyDependencyIsEmpty(tribe_ids, component_ids)) {
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
                        tribes: tribe_ids,
                        components: component_ids,
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
