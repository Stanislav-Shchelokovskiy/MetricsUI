import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { allDependenciesAreEmpty } from '../../common/components/Utils'


export interface Employee {
    crmid: string
    name: string
}


export const fetchEmployees: (position_ids: Array<string>, tribe_ids: Array<string>) => Promise<FetchResult<Array<Employee>>> =
    async function (position_ids: Array<string>, tribe_ids: Array<string>,) {
        if (allDependenciesAreEmpty(position_ids, tribe_ids)) {
            return {
                success: true,
                data: Array<Employee>()
            }
        }
        try {
            const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_employees`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        positions: position_ids,
                        tribes: tribe_ids,
                    }),
                }).then(response => response.json())
            return {
                success: true,
                data: (values as Array<Employee>)
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                data: Array<Employee>()
            }
        }
    }
