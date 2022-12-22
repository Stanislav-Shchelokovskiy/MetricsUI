import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { dependenciesAreEmpty } from '../../../../common/components/Utils'
import { CustomersActivityStore } from '../../../store/Store'
import { changeProducts, changeProductsInclude } from '../../../store/Actions'
import { fetchProducts, Product } from '../../../network_resource_fetcher/FetchProducts'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function ProductsSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const tribes = tribesNode?.values || emptyArray
    const platformsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.platforms)
    const platforms = platformsNode?.values || emptyArray
    const dataSource = useCascadeDataSource(() => fetchProducts(tribes, platforms), tribes, platforms)

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.products as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Product>, values: Array<string>) => changeProducts({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeProductsInclude({ stateId: setTitle, data: include })

    if (dependenciesAreEmpty(tribes, platforms, dataSource))
        return null
    return <MultiOptionSelector<Product, string>
        className='CustomersActivity_ProductsSelector'
        displayExpr='product_name'
        valueExpr='product_id'
        placeholder='Select products'
        label='Products'
        dataSource={dataSource}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
