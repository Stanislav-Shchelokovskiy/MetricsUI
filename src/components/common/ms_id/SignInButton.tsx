import React, { useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { LOGIN_REQUEST } from './AuthConfig';
import Button from '../../common/components/Button'

export default function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (e: any) => {
        const loginType: string = 'redirect'
        if (loginType === 'popup') {
            instance.loginPopup(LOGIN_REQUEST).catch(e => {
                console.log(e);
            });
        } else if (loginType === 'redirect') {
            instance.loginRedirect(LOGIN_REQUEST).catch(e => {
                console.log(e);
            });
        }
    }

    return < Button
        className='SignButton'
        stylingMode='text'
        text='Sign In'
        icon='user'
        onClick={handleLogin} />
}
