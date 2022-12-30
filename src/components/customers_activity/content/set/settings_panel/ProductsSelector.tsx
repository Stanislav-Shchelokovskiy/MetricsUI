import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeProducts, changeProductsInclude } from '../../../store/Actions'
import { fetchProducts, Product } from '../../../network_resource_fetcher/FetchProducts'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function ProductsSelector({ setTitle }: { setTitle: string }) {
    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const platformsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.platforms)
    const fetchArgs = [tribesNode, platformsNode]

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.products as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Product>, values: Array<string>) => changeProducts({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeProductsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Product, string>
        className='CustomersActivity_ProductsSelector'
        displayExpr='product_name'
        valueExpr='product_id'
        placeholder='Select products'
        label='Products'
        fetchDataSource={fetchProducts}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
