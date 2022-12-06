import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'


export interface GroupByPeriod {
    name: string
    format: string
}


export const fetchGroupByPeriods: () => Promise<FetchResult<Array<GroupByPeriod>>> = async function () {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_group_by_periods`).then(response => response.json())
        return {
            success: true,
            data: values as Array<GroupByPeriod>
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<GroupByPeriod>()
        }
    }
}
