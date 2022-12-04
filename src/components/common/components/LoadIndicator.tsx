import '../styles/LoadIndicator.css'

import React from 'react'
import { LoadIndicator as DxLoadIndicator } from 'devextreme-react/load-indicator'


interface Size {
    width: number | undefined
    height: number | undefined
}


function LoadIndicator({ width, height }: Size) {
    return (
        <div data-testid='LoadIndicator' className='LoadIndicator'>
            <DxLoadIndicator
                height={height}
                width={width} />
        </div>
    )
}

export default LoadIndicator
