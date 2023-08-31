import FetchResult from '../../common/Interfaces'
import { GroupByPeriod } from '../../common/components/multiset_container/graph/GroupByPeriodSelector'


export async function fetchGroupByPeriods(): Promise<FetchResult<Array<GroupByPeriod>>> {
    return {
        success: true,
        data: []
    }
}
