import FetchResult from '../../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import { FilterParametersNode } from '../../store/sets_reducer/Interfaces'

export interface Product {
    product_id: string
    pproduct_name: string
}

export async function fetchProducts(tents: FilterParametersNode<string>): Promise<FetchResult<Array<Product>>> {
    try {
        const values = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/get_products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tents: tents }),
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
