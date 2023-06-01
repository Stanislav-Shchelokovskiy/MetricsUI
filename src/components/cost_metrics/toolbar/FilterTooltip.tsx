import React, { useState, useEffect, useMemo } from 'react'

import { Tooltip } from 'devextreme-react/tooltip'
import { TooltipProps } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'

export const FilterTooltip = React.memo(({ visible, target }: TooltipProps) => {
    return null
    return (
        <Tooltip
            className='CostMetricsFilterTooltip'
            target={target}
            visible={visible}
        >
            {/* <FilterLabel /> */}
        </Tooltip>
    )
})
