import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Feature {
    tribeId: string
    controlId: string
    feature_id: string
    feature_name: string
}


export const fetchFeatures: (tribe_ids: Array<string>, component_ids: Array<string>) => Promise<FetchResult<Array<Feature>>> =
    async function (tribe_ids: Array<string>, component_ids: Array<string>,) {
        try {
            if (tribe_ids.length > 0 && component_ids.length > 0) {
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
            }
            else {
                return {
                    success: true,
                    data: Array<Feature>()
                }
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                data: Array<Feature>()
            }
        }
    }
