import React from 'react'


export default function Title({ title }: { title: string }) {
    return <div className='SetHeaderTitle'> {`Set ${title}`}</div>
}
