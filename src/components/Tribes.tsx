import React, { useRef, useEffect } from "react";
import ScrollView from 'devextreme-react/scroll-view';
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
        <div className="TribesContainer">
            <ScrollView id="scrollview"
                showScrollbar="onHover"
                scrollByThumb={true}
                scrollByContent={true}
                height={"89vh"}
            >
                <div className="Tribes">
                    {tribes?.map((tribe) => {
                        return <Tribe name={tribe.name} />
                    })}
                </div>
            </ScrollView>
        </div >
    )
}

export default Tribes