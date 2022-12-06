import React from 'react'


export default function Title({ setTitle }: { setTitle: string }) {
    return <div className='SetHeaderTitle'> {`Set ${setTitle}`}</div>
}
