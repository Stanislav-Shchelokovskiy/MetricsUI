import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { HelpItem } from '../../common/components/help/HelpButton'

export async function fetchHelp(): Promise<FetchResult<Array<HelpItem>>> {
    try {
        const helpItems = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_customers_activity_help`).then(response => response.json())
        return {
            success: true,
            data: helpItems
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: []
        }
    }
}
