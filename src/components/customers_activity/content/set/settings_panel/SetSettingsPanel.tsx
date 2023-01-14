import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from './TribesSelector'
import CustomersTypesSelector from './CustomersTypesSelector'
import CustomersConversionsTypesSelector from './CustomersConversionsTypesSelector'
import PlatformsSelector from './PlatformsSelector'
import ProductsSelector from './ProductsSelector'
import EmpPositionsSelector from './EmpPositionsSelector'
import EmpTribesSelector from './EmpTribesSelector'
import EmployeesSelector from './EmployeesSelector'
import RankSelector from './RankSelector'


export default function SetSettingsPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <div className='CustomersActivity_SetSettingsChildPanel'>
                {/* <RankSelector setTitle={setTitle} /> */}
                <TribesSelector setTitle={setTitle} />
                <PlatformsSelector setTitle={setTitle} />
                <ProductsSelector setTitle={setTitle} />
                <TicketsTagsSelector setTitle={setTitle} />
                <TicketsTypesSelector setTitle={setTitle} />
                <CustomersGroupsSelector setTitle={setTitle} />
                <CustomersTypesSelector setTitle={setTitle} />
                <CustomersConversionsTypesSelector setTitle={setTitle} />
                <EmpPositionsSelector setTitle={setTitle} />
                <EmpTribesSelector setTitle={setTitle} />
                <EmployeesSelector setTitle={setTitle} />
            </div>
        </div >
    )
}
