import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../common/components/Button'

function GoHomeButton({ className }: { className: string }) {
    return <Link to={'/'} className='NavigationButton'>
        <Button
            className={className}
            icon='home'
            hint='Go home'
            focusStateEnabled={false} />
    </Link>
}

export default React.memo(GoHomeButton)
