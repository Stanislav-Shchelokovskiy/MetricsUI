import React from 'react'
import PercentileSelector from './PercentileSelector'
import TribesSelector from './TribesSelector'
import PlatformsSelector from './platforms_products/PlatformsSelector'
import ProductsSelector from './platforms_products/ProductsSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TicketsTypesSelector from './tickets_types/TicketsTypesSelector'
import DuplicatedToTicketsTypesSelector from './tickets_types/DuplicatedToTicketsTypesSelector'
import CustomersGroupsSelector from './customers/CustomersGroupsSelector'
import CustomersTypesSelector from './customers/CustomersTypesSelector'
import CustomersConversionsTypesSelector from './customers/CustomersConversionsTypesSelector'
import EmpPositionsSelector from './employees/EmpPositionsSelector'
import EmpTribesSelector from './employees/EmpTribesSelector'
import EmployeesSelector from './employees/EmployeesSelector'
import ReplyTypesSelector from './cat/ReplyTypesSelector'
import ComponentsSelector from './cat/ComponentsSelector'
import FeaturesSelector from './cat/FeaturesSelector'
import CustomersSelector from './customers/CustomersSelector'
import VersionsSelector from './tickets/VersionsSelector'
import SeveritySelector from './bugs/SeveritySelector'
import TicketStatusesSelector from './bugs/TicketStatusesSelector'
import IDEsSelector from './tickets/IDEsSelector'
import OsSelector from './tickets/OsSelector'
import FrameworksSelector from './tickets/FrameworksSelector'
import FixedInSelector from './bugs/FixedInSelector'


export default function SetSettingsPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <PercentileSelector setTitle={setTitle} />
            <TribesSelector setTitle={setTitle} />
            <PlatformsSelector setTitle={setTitle} />
            <ProductsSelector setTitle={setTitle} />
            <VersionsSelector setTitle={setTitle} />
            <TicketsTagsSelector setTitle={setTitle} />
            <TicketsTypesSelector setTitle={setTitle} />
            <DuplicatedToTicketsTypesSelector setTitle={setTitle} />
            <FixedInSelector setTitle={setTitle} />
            <SeveritySelector setTitle={setTitle} />
            <TicketStatusesSelector setTitle={setTitle} />
            <FrameworksSelector setTitle={setTitle} />
            <OsSelector setTitle={setTitle} />
            <IDEsSelector setTitle={setTitle} />
            <CustomersGroupsSelector setTitle={setTitle} />
            <CustomersTypesSelector setTitle={setTitle} />
            <CustomersConversionsTypesSelector setTitle={setTitle} />
            <EmpPositionsSelector setTitle={setTitle} />
            <EmpTribesSelector setTitle={setTitle} />
            <EmployeesSelector setTitle={setTitle} />
            <ReplyTypesSelector setTitle={setTitle} />
            <ComponentsSelector setTitle={setTitle} />
            <FeaturesSelector setTitle={setTitle} />
            <CustomersSelector setTitle={setTitle} />
        </div >
    )
}
