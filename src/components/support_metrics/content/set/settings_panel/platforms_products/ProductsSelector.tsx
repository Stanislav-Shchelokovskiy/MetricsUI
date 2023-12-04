import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeProducts, changeProductsInclude } from '../../../../store/actions/PlatformsProducts'
import { fetchProducts, Product } from '../../../../network_resource_fetcher/platforms_products/FetchProducts'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { productsSelector } from '../../../../store/sets/Selectors'
import { tentsSelector } from '../../../../../common/store/multiset_container/sets/selectors/Common'


export default function ProductsSelector() {
    const setTitle = useSetTitle()
    const tentsNode = useSelector((store: SupportMetricsStore) => tentsSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(tentsNode)]

    const value = useSelector((store: SupportMetricsStore) => productsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Product>, values: Array<string>) => changeProducts({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeProductsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Product, string>
        displaySelector='product_name'
        valueSelector='product_id'
        placeholder='Select products'
        label='Products'
        fetchDataSource={fetchProducts}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
