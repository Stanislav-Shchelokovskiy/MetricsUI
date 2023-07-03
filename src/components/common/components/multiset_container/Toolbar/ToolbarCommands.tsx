import React, { PropsWithChildren } from 'react'
import StateManagementCommands from './StateManagementCommands'
import DownloadButton from '../../DownloadButton'
import GoHomeButton from '../../GoHomeButton'

function ToolbarCommands(props: PropsWithChildren) {
    return <div className='ToolbarCommands'>
        {props.children ? props.children : <>
            <StateManagementCommands />
            <ToolbarSeparator />
            <DownloadButton />
            <ToolbarSeparator />
            <GoHomeButton />
        </>
        }
    </div>
}

export default React.memo(ToolbarCommands)

export function ToolbarSeparator() {
    return <div className='ToolbarSeparator'></div>
}
