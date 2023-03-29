import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/sets_reducer/Interfaces'
import { allNodesAreConsideredEmpty } from '../../store/Utils'

export interface ConversionStatus {
    id: number
    name: string
}


export async function fetchConversionStatuses(licenseStatuses: FilterParametersNode<number>): Promise<FetchResult<Array<ConversionStatus>>> {
    if (allNodesAreConsideredEmpty(licenseStatuses))
        return {
            success: true,
            data: Array<ConversionStatus>()
        }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_conversion_statuses`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    license_statuses: licenseStatuses,
                }),
            }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<ConversionStatus>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<ConversionStatus>()
        }
    }
}
