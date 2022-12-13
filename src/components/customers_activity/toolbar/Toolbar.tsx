import React, { useCallback, useState } from 'react'
import { Toast } from 'devextreme-react/toast';
import Button from '../../common/components/Button'
import DownloadButton from './DownloadButton'

function Toolbar({ onShowChange }: { onShowChange: () => void }) {
    const [toastConfig, setToastConfig] = useState({
        isVisible: false,
        message: '',
    })

    const onError = useCallback(
        (message: string) => {
            setToastConfig({
                message: message,
                isVisible: true,
            });
        }, [])

    const onHiding = useCallback(() => {
        setToastConfig({
            ...toastConfig,
            isVisible: false,
        });
    }, [])

    return (
        <React.Fragment>
            < div className='CustomersActivityToolbar'>
                <Button icon='menu' onClick={onShowChange} />
                <div className='CustomersActivityToolbarCommands'>
                    <DownloadButton onError={onError} />
                </div>
            </div>
            <Toast
                visible={toastConfig.isVisible}
                message={toastConfig.message}
                type='error'
                onHiding={onHiding}
                displayTime={3000}
            />
        </React.Fragment >
    )
}

export default React.memo(Toolbar)
