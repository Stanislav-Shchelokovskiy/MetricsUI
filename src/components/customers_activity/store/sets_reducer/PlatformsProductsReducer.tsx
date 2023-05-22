import { AnyAction } from '@reduxjs/toolkit'
import { Set } from './Interfaces'
import { 
    updateSetState,
    updateValues,
    updateInclude
} from '../../../common/store/set_container/sets/Utils'
import {
    CHANGE_PLATFORMS,
    CHANGE_PLATFORMS_INCLUDE,
    CHANGE_PRODUCTS,
    CHANGE_PRODUCTS_INCLUDE,
} from '../actions/PlatformsProducts'


export function platformsProductsReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
    switch (action.type) {

        case CHANGE_PLATFORMS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    platforms: updateValues(x.platforms, action.payload.data)
                }
            })
        case CHANGE_PLATFORMS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    platforms: updateInclude(x.platforms, action.payload.data)
                }
            })


        case CHANGE_PRODUCTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    products: updateValues(x.products, action.payload.data)
                }
            })
        case CHANGE_PRODUCTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    products: updateInclude(x.products, action.payload.data)
                }
            })


        default:
            return sets
    }
}
