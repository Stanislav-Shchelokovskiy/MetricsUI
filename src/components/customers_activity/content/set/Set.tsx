import React from 'react'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'
import Set from '../../../common/components/multiset_container/set/Set'
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


function SetWrapper({ setTitle }: SetProps) {
    return (
        <Set setTitle={setTitle}>
            <PercentileSelector setTitle={setTitle} />
            <PrivacySelector setTitle={setTitle} />
            <BAMCustomersGroupsSelector setTitle={setTitle} />
            <TicketsTypesSelector setTitle={setTitle} />
            <TribesSelector setTitle={setTitle} />
            <TentsSelector setTitle={setTitle} />
            <PlatformsSelector setTitle={setTitle} />
            <ProductsSelector setTitle={setTitle} />
            <VersionsSelector setTitle={setTitle} />
            <TicketsTagsSelector setTitle={setTitle} />
            <DuplicatedToTicketsTypesSelector setTitle={setTitle} />
            <FixedInSelector setTitle={setTitle} />
            <FixedBySelector setTitle={setTitle} />
            <FixedBetweenSelector setTitle={setTitle} />
            <SeveritySelector setTitle={setTitle} />
            <TicketStatusesSelector setTitle={setTitle} />
            <ClosedBySelector setTitle={setTitle} />
            <ClosedBetweenSelector setTitle={setTitle} />
            <FrameworksSelector setTitle={setTitle} />
            <OsSelector setTitle={setTitle} />
            <IDEsSelector setTitle={setTitle} />
            <CustomersGroupsSelector setTitle={setTitle} />
            <CustomersTypesSelector setTitle={setTitle} />
            <CustomersConversionsTypesSelector setTitle={setTitle} />
            <EmpPositionsSelector setTitle={setTitle} />
            <EmpTribesSelector setTitle={setTitle} />
            <EmpTentsSelector setTitle={setTitle} />
            <EmployeesSelector setTitle={setTitle} />
            <AssignedToSelector setTitle={setTitle} />
            <ReplyTypesSelector setTitle={setTitle} />
            <ComponentsSelector setTitle={setTitle} />
            <FeaturesSelector setTitle={setTitle} />
            <CustomersSelector setTitle={setTitle} />
        </Set>
    )
}

export default React.memo(SetWrapper)
