import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)
    return (
        <div className='ErrorPage'>
            <h1>Oops!</h1>
            <p> {isRouteErrorResponse(error) ? <i>{error.status}</i> : ''} </p>
        </div>
    )
}
