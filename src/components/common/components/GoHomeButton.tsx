import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

function GoHomeButton() {
    return <Link to={'/'} className='NavigationButton'>
        <Button
            className='CommandButton'
            icon='home'
            hint='Go home'
            focusStateEnabled={false} />
    </Link>
}

export default React.memo(GoHomeButton)
