import FetchResult from '../../../common/Interfaces'
import { fetchVersions, Version } from '../tickets/FetchVersions'


export async function fetchFixedInVersions(): Promise<FetchResult<Array<Version>>> {
    return await fetchVersions()
}
