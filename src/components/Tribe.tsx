import React from 'react'

interface TribeData {
    name: string
}


function Caption({ name }: TribeData) {
    return <h1>{name}</h1>
}

function Tribe({ name }: TribeData) {
    return (
        <div className='Tribe'>
            <Caption name={name}/>
        </div>
    )

}

export default Tribe