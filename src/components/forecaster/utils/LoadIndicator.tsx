import '../styles/utils.css'

import React from 'react'
import { LoadIndicator as DxLoadIndicator } from 'devextreme-react/load-indicator'

function LoadIndicator() {
    return (
        <div className='LoadIndicator'>
            <DxLoadIndicator
                height={100}
                width={100} />
        </div>
    )
}

export default LoadIndicator