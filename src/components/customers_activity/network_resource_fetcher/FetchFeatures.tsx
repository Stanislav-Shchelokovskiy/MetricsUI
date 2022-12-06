import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Feature {
    tribeId: string
    controlId: string
    id: string
    name: string
}


export const fetchFeatures: () => Promise<FetchResult<Array<Feature>>> = async function () {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_features`).then(response => response.json())
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
