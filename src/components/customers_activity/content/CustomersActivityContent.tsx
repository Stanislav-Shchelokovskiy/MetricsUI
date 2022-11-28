import React from 'react'
import Sets from './Sets'
import SetsComparisonPanel from '../sets_comparison_panel/SetsComparisonPanel'
import ApplyButton from './ApplyButton'


export default function CustomersActivityContent() {
    return (
        <div className='CustomersActivity_Content'>
            <Sets />
            <ApplyButton />
            <SetsComparisonPanel />
        </div>
    )
}