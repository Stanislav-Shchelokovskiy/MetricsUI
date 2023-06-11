import React from 'react'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'
import SetWithHeader from '../../../common/components/multiset_container/set/Set'
import PercentileSelector from './settings_panel/PercentileSelector'
import TribesSelector from './settings_panel/TribesSelector'
import TentsSelector from './settings_panel/TentsSelector'
import PlatformsSelector from './settings_panel/platforms_products/PlatformsSelector'
import ProductsSelector from './settings_panel/platforms_products/ProductsSelector'
import TicketsTagsSelector from './settings_panel/tickets/TicketsTagsSelector'
import TicketsTypesSelector from './settings_panel/tickets_types/TicketsTypesSelector'
import DuplicatedToTicketsTypesSelector from './settings_panel/tickets_types/DuplicatedToTicketsTypesSelector'
import CustomersGroupsSelector, { BAMCustomersGroupsSelector } from './settings_panel/customers/CustomersGroupsSelector'
import CustomersTypesSelector from './settings_panel/customers/CustomersTypesSelector'
import CustomersConversionsTypesSelector from './settings_panel/customers/CustomersConversionsTypesSelector'
import EmpPositionsSelector from './settings_panel/employees/EmpPositionsSelector'
import EmpTribesSelector from './settings_panel/employees/EmpTribesSelector'
import EmpTentsSelector from './settings_panel/employees/EmpTentsSelector'
import EmployeesSelector from './settings_panel/employees/EmployeesSelector'
import ReplyTypesSelector from './settings_panel/cat/ReplyTypesSelector'
import ComponentsSelector from './settings_panel/cat/ComponentsSelector'
import FeaturesSelector from './settings_panel/cat/FeaturesSelector'
import CustomersSelector from './settings_panel/customers/CustomersSelector'
import VersionsSelector from './settings_panel/tickets/VersionsSelector'
import SeveritySelector from './settings_panel/bugs/SeveritySelector'
import TicketStatusesSelector from './settings_panel/bugs/TicketStatusesSelector'
import IDEsSelector from './settings_panel/tickets/IDEsSelector'
import OsSelector from './settings_panel/tickets/OsSelector'
import FrameworksSelector from './settings_panel/tickets/FrameworksSelector'
import FixedInSelector from './settings_panel/bugs/FixedInSelector'
import PrivacySelector from './settings_panel/tickets/PrivacySelector'
import AssignedToSelector from './settings_panel/bugs/AssignedToSelector'
import ClosedBySelector from './settings_panel/bugs/ClosedBySelector'
import FixedBySelector from './settings_panel/bugs/FixedBySelector'
import ClosedBetweenSelector from './settings_panel/bugs/ClosedBetweenSelector'
import FixedBetweenSelector from './settings_panel/bugs/FixedBetweenSelector'


function Set({ setTitle }: SetProps) {
    return (
        <SetWithHeader setTitle={setTitle}>
            <PercentileSelector />
            <PrivacySelector />
            <BAMCustomersGroupsSelector />
            <TicketsTypesSelector />
            <TribesSelector />
            <TentsSelector />
            <PlatformsSelector />
            <ProductsSelector />
            <VersionsSelector />
            <TicketsTagsSelector />
            <DuplicatedToTicketsTypesSelector />
            <FixedInSelector />
            <FixedBySelector />
            <FixedBetweenSelector />
            <SeveritySelector />
            <TicketStatusesSelector />
            <ClosedBySelector />
            <ClosedBetweenSelector />
            <FrameworksSelector />
            <OsSelector />
            <IDEsSelector />
            <CustomersGroupsSelector />
            <CustomersTypesSelector />
            <CustomersConversionsTypesSelector />
            <EmpPositionsSelector />
            <EmpTribesSelector />
            <EmpTentsSelector />
            <EmployeesSelector />
            <AssignedToSelector />
            <ReplyTypesSelector />
            <ComponentsSelector />
            <FeaturesSelector />
            <CustomersSelector />
        </SetWithHeader>
    )
}

export default React.memo(Set)
