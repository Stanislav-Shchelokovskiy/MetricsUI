import './styles/CommonSettingsPanel.css';
import './styles/Tribes.css';
import './styles/Tribe.css';
import './styles/Forecast.css';

import Tribes, { TribeData } from './Tribes';
import CommonSettingsPanel from './CommonSettingsPanel';

function Forecaster() {
    return (
        <div className='Forecaster'>
            <CommonSettingsPanel tribes={
                [
                    { id: '1', name: 'WinForms Desktop UI' },
                    { id: '2', name: 'Data Visualization and Analysis' },
                    { id: '3', name: 'App Frameworks (UI, API, ORM)' },
                    { id: '4', name: 'XAML United Team' },
                ]
            } />
            <Tribes tribes={
                [
                    { id: '1', name: 'WinForms Desktop UI' },
                    { id: '2', name: 'Data Visualization and Analysis' },
                ]
            } />
        </div>
    )

}

export default Forecaster