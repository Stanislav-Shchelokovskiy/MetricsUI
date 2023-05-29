import FetchResult from '../Interfaces'
import { Tribe } from '../Interfaces'
import { QUERY_SERVICE_END_POINT } from '../EndPoint'
import { fetchArray } from './FetchOrDefault'

export const fetchTribes: () => Promise<FetchResult<Array<Tribe>>> = async function () {
    return fetchArray(`${QUERY_SERVICE_END_POINT}/get_available_tribes`)
}
