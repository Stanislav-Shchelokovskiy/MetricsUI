import FetchResult from '../../../common/Interfaces'
import { fetchVersions, Version } from '../tickets/FetchVersions'
import { nodeIsEmpty } from '../../store/Utils'
import { FilterParametersNode } from '../../store/SetsReducer'


export async function fetchFixedInVersions(ticketTypes: FilterParametersNode<number>): Promise<FetchResult<Array<Version>>> {
    if (nodeIsEmpty(ticketTypes, 2))
        return {
            success: true,
            data: Array<Version>()
        }
    return await fetchVersions()
}
