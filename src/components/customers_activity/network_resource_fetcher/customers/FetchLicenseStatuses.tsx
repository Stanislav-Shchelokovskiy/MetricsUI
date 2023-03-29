import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'

export interface LicenseStatus {
    id: number
    name: string
}

export async function fetchLicenseStatuses(): Promise<FetchResult<Array<LicenseStatus>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_license_statuses`).then(response => response.json())
        return {
            success: true,
            data: (values as Array<LicenseStatus>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<LicenseStatus>()
        }
    }
}
