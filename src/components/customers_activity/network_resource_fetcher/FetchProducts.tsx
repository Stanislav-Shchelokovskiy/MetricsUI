import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { anyDependencyIsEmpty } from '../../common/components/Utils'

export interface Product {
    product_id: string
    pproduct_name: string
}


export const fetchProducts: (tribe_ids: Array<string>, platform_ids: Array<string>) => Promise<FetchResult<Array<Product>>> = async function (tribe_ids: Array<string>, platform_ids: Array<string>) {
    if (anyDependencyIsEmpty(tribe_ids, platform_ids)) {
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
                tribes: tribe_ids,
                platforms: platform_ids
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
