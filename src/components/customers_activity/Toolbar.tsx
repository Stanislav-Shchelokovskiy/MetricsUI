//<a href="test.xlsx" download ><button>Click to download test.xlsx</button></a>
import React, { useCallback, useEffect } from 'react'
import { Toolbar as DxToolbar, Item } from 'devextreme-react/toolbar'
import { Button } from 'devextreme-react/button';

export default function Toolbar({ onShowChange }: { onShowChange: () => void }) {
    const downloadSetRawData = useCallback(() => {
        console.log('downloadSetRawData')
    }, [])
    return (
        < DxToolbar className='CustomersActivityToolbar'>
            <Item location='before'>
                <Button icon='menu' onClick={onShowChange}></Button>
            </Item>
            <Item location='center'>
                <a href="test.xlsx" download ><Button icon='download' /></a>
                {/* <Button icon='download' onClick={downloadSetRawData}></Button> */}
            </Item>
        </DxToolbar>
    )
}
