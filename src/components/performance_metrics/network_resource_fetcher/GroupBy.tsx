import FetchResult from '../../common/Interfaces'
import { GroupBy } from '../../common/components/multiset_container/graph/GroupBySelector'


export async function fetchGroupBys(): Promise<FetchResult<Array<GroupBy>>> {
    return {
        success: true,
        data: []
    }
}
