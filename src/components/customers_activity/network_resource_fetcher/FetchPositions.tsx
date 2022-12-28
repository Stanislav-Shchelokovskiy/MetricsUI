import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Position {
    id: string
    name: string
}


export const fetchPositions: () => Promise<FetchResult<Array<Position>>> = async function () {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_positions`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Position>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Position>()
        }
    }
}
