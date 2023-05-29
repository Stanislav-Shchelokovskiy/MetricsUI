import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { HelpItem } from '../../common/components/help/HelpButton'

export async function fetchHelp(): Promise<FetchResult<Array<HelpItem>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/get_customers_activity_help`)
}
