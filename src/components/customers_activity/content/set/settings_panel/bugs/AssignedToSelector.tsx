import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeAssignedTo, changeAssignedToInclude } from '../../../../store/actions/Bugs'
import { fetchEmployees, Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { getDefaultFilterParametersNode } from '../../../../store/SetsReducer'


export default function AssignedToSelector({ setTitle }: { setTitle: string }) {
    // TODO
}
