import React, { useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { LOGIN_REQUEST } from './AuthConfig';
import Button from '../../common/components/Button'

export default function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (e: any) => {
        const loginType: string = 'redirect'

        switch (loginType) {
            case 'popup':
                instance.loginPopup(LOGIN_REQUEST).catch(e => { console.log(e) })
                break

            case 'redirect':
                instance.loginRedirect(LOGIN_REQUEST).catch(e => { console.log(e) })
                break
        }
    }

    return < Button
        className='SignButton'
        stylingMode='text'
        text='Sign In'
        icon='user'
        onClick={handleLogin} />
}
