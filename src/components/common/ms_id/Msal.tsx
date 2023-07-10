import { PublicClientApplication, EventType, EventMessage, AccountInfo } from '@azure/msal-browser'
import { MSAL_CONFIG } from './AuthConfig'
import Cookies from 'js-cookie'
import { getRole } from './Roles'

const ROLE = 'role'


function setActiveAccount(msalInstance: PublicClientApplication): AccountInfo | undefined {
    if (!msalInstance.getActiveAccount()) {
        return resetActiveAccount(msalInstance)
    }
}

function resetActiveAccount(msalInstance: PublicClientApplication): AccountInfo | undefined {
    if (msalInstance.getAllAccounts().length > 0) {
        const account = msalInstance.getAllAccounts()[0]
        msalInstance.setActiveAccount(account)
        return account
    }
}

export function getMsalInstance() {
    const msalInstance = new PublicClientApplication(MSAL_CONFIG)

    setActiveAccount(msalInstance)

    msalInstance.addEventCallback((event: EventMessage) => {
        switch (event.eventType) {
            case EventType.LOGIN_SUCCESS:
                const account = setActiveAccount(msalInstance)
                const role = getRole(account)
                Cookies.set(ROLE, role, { secure: true })
                break
            case EventType.LOGOUT_SUCCESS:
                resetActiveAccount(msalInstance)
                Cookies.remove(ROLE)
                break
            case EventType.LOGIN_FAILURE:
                Cookies.remove(ROLE)
                console.log(JSON.stringify(event))
                break
        }
    })

    return msalInstance
}

