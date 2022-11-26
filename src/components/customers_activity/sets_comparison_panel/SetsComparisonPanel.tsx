import React from 'react'
import ComparisonMethodSelector from './ComparisonMethodSelector'
import ComparisonGraph from './ComparisonGraph'


export default function SetsComparisonPanel() {
    return (
        <div className='CustomersActivity_SetsComparisonPanel'>
            <ComparisonMethodSelector />
            <ComparisonGraph />
        </div>
    )
}
