import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_PLATFORMS = 'customers_activity/change_platforms'
export const changePlatforms = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_PLATFORMS,
        payload: payload
    }
}

export const CHANGE_PLATFORMS_INCLUDE = 'customers_activity/change_platforms_include'
export const changePlatformsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_PLATFORMS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_PRODUCTS = 'customers_activity/change_products'
export const changeProducts = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_PRODUCTS,
        payload: payload
    }
}

export const CHANGE_PRODUCTS_INCLUDE = 'customers_activity/change_products_include'
export const changeProductsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_PRODUCTS_INCLUDE,
        payload: payload
    }
}
