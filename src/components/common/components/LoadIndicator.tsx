import '../styles/LoadIndicator.css'

import React from 'react'
import { LoadIndicator as DxLoadIndicator } from 'devextreme-react/load-indicator'


interface Size {
    width: number | undefined
    height: number | undefined
    className: string
}


function LoadIndicator({ width, height, className }: Size) {
    return (
        <div className={className} >
            <DxLoadIndicator
                height={height}
                width={width} />
        </div>
    )
}

LoadIndicator.defaultProps = {
    className: 'LoadIndicator'
}

export default LoadIndicator
