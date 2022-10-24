import React from "react";

export interface Tribe {
    id: string
    name: string
}

interface TribesList {
    tribes?: Array<Tribe>
}


export default function Tribes({ tribes }: TribesList) {
    return (
        <div>
            {
                tribes?.map((tribe) => {
                    return tribe.name
                })
            }
        </div>
    )
}