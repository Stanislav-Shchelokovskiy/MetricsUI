import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { HelpItem } from '../../common/Interfaces'

export async function fetchHelp(): Promise<FetchResult<Array<HelpItem>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Help`)
}
