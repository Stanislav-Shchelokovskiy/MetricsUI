import React, { useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './AuthConfig';
import Button from '../../common/components/Button'

export default function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (e: any) => {
        const loginType: string = 'redirect'
        if (loginType === 'popup') {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === 'redirect') {
            instance.loginRedirect(loginRequest).catch(e => {
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
