import React from 'react'
import SetsSelector from './SetsSelector'
import ComparisonMethodSelector from './ComparisonMethodSelector'
import ComparisonGraph from './ComparisonGraph'


export default function SetsComparisonPanel() {
    return (
        <div className='CustomersActivity_SetsComparisonPanel'>
            <SetsSelector />
            <ComparisonMethodSelector />
            <ComparisonGraph />
        </div>
    )
}
