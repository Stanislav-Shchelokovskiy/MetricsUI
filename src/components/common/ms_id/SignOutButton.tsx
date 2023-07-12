import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from '../../common/components/Button'

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (e: any) => {
        const logoutType: string = 'redirect'

        switch (logoutType) {
            case 'popup':
                instance.logoutPopup({
                    postLogoutRedirectUri: '/',
                    mainWindowRedirectUri: '/'
                })
                break

            case 'redirect':
                instance.logoutRedirect({
                    postLogoutRedirectUri: '/',
                })
                break
        }
    }
    return < Button
        className='CommandButton'
        stylingMode='text'
        hint='Sign Out'
        icon='runner'
        onClick={handleLogout} />
}
