import React from 'react'
import Sets from './Sets'
import SetsComparisonPanel from '../sets_comparison_panel/SetsComparisonPanel'


export default function CustomersActivityContent() {
    return (
        <div className='CustomersActivity_Content'>
            <Sets />
            <SetsComparisonPanel />
        </div>
    )
}