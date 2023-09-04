import FetchResult from '../../common/Interfaces'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'

export async function fetchPeriods(containerState: BaseContainerState, signal: AbortSignal): Promise<FetchResult<Array<string>>> {
    return {
        success: true,
        data: Array<string>()
    }
}
