import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface ConversionStatus {
    id: number
    name: string
}


export const fetchConversionStatuses: (license_status_ids: Array<number>) => Promise<FetchResult<Array<ConversionStatus>>> = async function (license_status_ids: Array<number>) {
    try {
        if (license_status_ids.length > 0) {
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
        }
        else {
            return {
                success: true,
                data: Array<ConversionStatus>()
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<ConversionStatus>()
        }
    }
}
