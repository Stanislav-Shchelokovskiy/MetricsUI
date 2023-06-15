import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from '../../../common/store/multiset_container/sets/actions/Actions'


export const CHANGE_PLATFORMS = 'customers_activity/change_platforms'
export const changePlatforms = getValuesPayloadAction<string>(CHANGE_PLATFORMS)

export const CHANGE_PLATFORMS_INCLUDE = 'customers_activity/change_platforms_include'
export const changePlatformsInclude = getIncludePayloadAction(CHANGE_PLATFORMS_INCLUDE)


export const CHANGE_PRODUCTS = 'customers_activity/change_products'
export const changeProducts = getValuesPayloadAction<string>(CHANGE_PRODUCTS)

export const CHANGE_PRODUCTS_INCLUDE = 'customers_activity/change_products_include'
export const changeProductsInclude = getIncludePayloadAction(CHANGE_PRODUCTS_INCLUDE)
