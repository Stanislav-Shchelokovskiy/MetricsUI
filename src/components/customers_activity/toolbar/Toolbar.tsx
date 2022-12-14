import React from 'react'
import Button from '../../common/components/Button'
import DownloadButton from './DownloadButton'
import SaveStateButton from './SaveStateButton'
import StatesSelector from './StatesSelector'

function Toolbar({ onShowChange }: { onShowChange: () => void }) {
    return (
        < div className='CustomersActivityToolbar'>
            <Button
                className='CustomersActivityMenuButton'
                icon='menu'
                onClick={onShowChange}
            />
            <div className='CustomersActivityToolbarCommands'>
                <StatesSelector />
                <SaveStateButton />
                <div className='CustomersActivityToolbarSeparator'></div>
                <DownloadButton />
            </div>
        </div>
    )
}

export default React.memo(Toolbar)
