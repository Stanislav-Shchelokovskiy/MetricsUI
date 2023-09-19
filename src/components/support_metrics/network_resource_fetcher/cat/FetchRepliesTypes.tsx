import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface ReplyType {
    id: string
    name: string
}

export async function fetchRepliesTypes(): Promise<FetchResult<Array<ReplyType>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/CATRepliesTypes`)
}
