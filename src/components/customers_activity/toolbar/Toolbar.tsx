import React from 'react'
import { Toolbar as DxToolbar, Item } from 'devextreme-react/toolbar'
import Button from '../../common/components/Button'
import DownloadButton from './DownloadButton'

export default function Toolbar({ onShowChange }: { onShowChange: () => void }) {
    return (
        < DxToolbar className='CustomersActivityToolbar'>
            <Item location='before'>
                <Button icon='menu' onClick={onShowChange} />
            </Item>
            <Item location='after'>
                <DownloadButton />
            </Item>
        </DxToolbar>
    )
}
