import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { dependenciesAreEmpty } from '../../common/components/Utils'


export interface ConversionStatus {
    id: number
    name: string
}


export const fetchConversionStatuses: (license_status_ids: Array<number>) => Promise<FetchResult<Array<ConversionStatus>>> = async function (license_status_ids: Array<number>) {
    if (dependenciesAreEmpty(license_status_ids)) {
        return {
            success: true,
            data: Array<ConversionStatus>()
        }
    }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_conversion_statuses`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    license_statuses: license_status_ids,
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
