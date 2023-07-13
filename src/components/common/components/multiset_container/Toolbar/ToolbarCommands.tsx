import React, { PropsWithChildren } from 'react'
import StateManagementCommands from './StateManagementCommands'
import DownloadButton from '../../DownloadButton'
import GoHomeButton from '../../GoHomeButton'
import SignOutButton from '../../../ms_id/SignOutButton'

function ToolbarCommands(props: PropsWithChildren) {
    return <div className='ToolbarCommands'>
        {props.children ? props.children : <>
            <StateManagementCommands />
            <ToolbarSeparator />
            <DownloadButton />
            <ToolbarSeparator />
            <GoHomeButton />
            <ToolbarSeparator />
            <SignOutButton />
        </>
        }
    </div>
}

export default React.memo(ToolbarCommands)

export function ToolbarSeparator() {
    return <div className='ToolbarSeparator'></div>
}
