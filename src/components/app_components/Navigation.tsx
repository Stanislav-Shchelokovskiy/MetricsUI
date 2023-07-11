import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'devextreme-react/button'
import Root from './Root'
import {
    FORECASTER,
    ENGINEERING_METRICS,
} from './Paths'

export default function NavMenu() {
    return (
        <Root>
            <Link to={FORECASTER} className='NavigationButton'>
                <Button
                    className='NavElement'
                    text='Forecaster'
                    focusStateEnabled={false} />
            </Link>
            <Link to={ENGINEERING_METRICS} className='NavigationButton'>
                <Button
                    className='NavElement'
                    text='Engineering metrics'
                    focusStateEnabled={false} />
            </Link>
        </Root>
    )
}
