import React, { PropsWithChildren } from 'react'

export default function Root(props: PropsWithChildren) {
    return <div className='Root'>
        {props.children}
    </div>
}
