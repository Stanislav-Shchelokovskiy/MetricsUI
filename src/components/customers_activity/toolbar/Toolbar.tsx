import React from 'react'
import Button from '../../common/components/Button'
import DownloadButton from './DownloadButton'

function Toolbar({ onShowChange }: { onShowChange: () => void }) {
    return (
        < div className='CustomersActivityToolbar'>
            <Button icon='menu' onClick={onShowChange} />
            <div className='CustomersActivityToolbarCommands'>
                <DownloadButton />
            </div>
        </div>
    )
}

export default React.memo(Toolbar)
