import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export const fetchTents: () => Promise<FetchResult<Array<Knot>>> = async function () {
    return fetchArray(`${FORECASTER_END_POINT}/tents`)
}
