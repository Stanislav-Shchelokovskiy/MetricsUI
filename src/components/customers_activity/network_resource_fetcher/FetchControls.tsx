import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


export interface Control {
    tribeId: string
    control_id: string
    control_name: string
}


export const fetchControls: (tribe_ids: Array<string>) => Promise<FetchResult<Array<Control>>> = async function (tribe_ids: Array<string>) {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_controls`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tribes: tribe_ids,
            }),
        }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Control>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Control>()
        }
    }
}
