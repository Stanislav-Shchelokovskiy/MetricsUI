import React, { PropsWithChildren } from 'react'

interface MultisetContainerContentProps {
    className: string
}
export default function MultisetContainerContent(props: PropsWithChildren<MultisetContainerContentProps>) {
    return <div className={props.className}>
        {props.children}
    </div>
}

MultisetContainerContent.defaultProps = {
    className: 'MultisetContainerContent',
}
