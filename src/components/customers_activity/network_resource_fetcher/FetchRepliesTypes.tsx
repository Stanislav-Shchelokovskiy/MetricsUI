import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface ReplyType {
    id: string
    name: string
}


export const fetchRepliesTypes: () => Promise<FetchResult<Array<ReplyType>>> = async function () {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_replies_types`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<ReplyType>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<ReplyType>()
        }
    }
}
