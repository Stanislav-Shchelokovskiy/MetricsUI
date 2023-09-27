import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from '../SetsReducer'
import { 
    updateSetState,
    updateValues,
    updateValuesInclude
} from '../../../common/store/multiset_container/Utils'
import {
    CHANGE_PLATFORMS,
    CHANGE_PLATFORMS_INCLUDE,
    CHANGE_PRODUCTS,
    CHANGE_PRODUCTS_INCLUDE,
} from '../actions/PlatformsProducts'


export function platformsProductsReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
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
                    platforms: updateValuesInclude(x.platforms, action.payload.data)
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
                    products: updateValuesInclude(x.products, action.payload.data)
                }
            })


        default:
            return sets
    }
}
