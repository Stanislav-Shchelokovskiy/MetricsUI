import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/SetsReducer'
import { anyNodeIsConsideredEmpty } from '../../store/Utils'

export interface Product {
    product_id: string
    pproduct_name: string
}


export async function fetchProducts(
    tribes: FilterParametersNode<string>,
    platforms: FilterParametersNode<string>
): Promise<FetchResult<Array<Product>>> {
    if (anyNodeIsConsideredEmpty(tribes, platforms)) {
        return {
            success: true,
            data: Array<Product>()
        }
    }
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tribes: tribes,
                platforms: platforms
            }),
        }).then(response => response.json())
        return {
            success: true,
            data: (values as Array<Product>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Product>()
        }
    }
}
