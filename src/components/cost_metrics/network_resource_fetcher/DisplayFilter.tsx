import FetchResult from '../../common/Interfaces'
import { SetState } from '../store/sets/SetsReducer'


export async function fetchDisplayFilter(metric: string, set: SetState,): Promise<FetchResult<Array<any>>> {
    return {
        success: false,
        data: []
    }
}
