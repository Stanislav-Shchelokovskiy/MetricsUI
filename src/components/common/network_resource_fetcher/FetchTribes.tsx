import FetchResult from '../Interfaces'
import { Tribe } from '../Interfaces'
import { QUERY_SERVICE_END_POINT } from '../EndPoint'


export const fetchTribes: () => Promise<FetchResult<Array<Tribe>>> = async function () {
    try {
        const tribes = await fetch(`${QUERY_SERVICE_END_POINT}/get_available_tribes`).then(response => response.json())
        return {
            success: true,
            data: (tribes as Array<Tribe>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Tribe>()
        }
    }
}
