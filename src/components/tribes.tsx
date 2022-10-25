import React from "react";

export interface Tribe {
    id: string
    name: string
}

interface TribesList {
    tribes?: Array<Tribe>
}


function Tribes({ tribes }: TribesList) {
    return (
        <div className="Tribes">
            {
                tribes?.map((tribe) => {
                    return tribe.name
                })
            }
        </div>
    )
}

export default Tribes