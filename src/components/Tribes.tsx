import React, { useRef, useEffect } from "react";
import Tribe from './Tribe'

export interface TribeData {
    id: string
    name: string
}

interface TribesList {
    tribes?: Array<TribeData>
}


function Tribes({ tribes }: TribesList) {
    return (
        <div className="Tribes">
            {tribes?.map((tribe) => {
                return <Tribe name={tribe.name} />
            })}
        </div>
    )
}

export default Tribes