import {
    PublicClientApplication,
    EventType,
    EventMessage,
    AccountInfo,
    InteractionRequiredAuthError,
} from '@azure/msal-browser'
import Cookies from 'js-cookie'
import { MSAL_CONFIG } from './AuthConfig'
import { getRole } from './Roles'


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

let msalInstance: PublicClientApplication | null = null
export function getMsalInstance() {
    const instance = new PublicClientApplication(MSAL_CONFIG)

    setActiveAccount(instance)

    const ROLE = 'role'
    instance.addEventCallback((event: EventMessage) => {
        switch (event.eventType) {
            case EventType.LOGIN_SUCCESS:
                const account = setActiveAccount(instance)
                const role = getRole(account)
                if (role)
                    Cookies.set(ROLE, role, { secure: true, expires: 90 })
                break
            case EventType.LOGOUT_SUCCESS:
                resetActiveAccount(instance)
                Cookies.remove(ROLE)
                break
            case EventType.LOGIN_FAILURE:
                Cookies.remove(ROLE)
                console.log(JSON.stringify(event))
                break
        }
    })
    msalInstance = instance
    return msalInstance
}

export async function getAccessToken(): Promise<string | undefined> {
    // https://learn.microsoft.com/en-us/entra/identity-platform/scenario-spa-acquire-token?tabs=react
    const accessTokenRequest = {
        scopes: ["user.read"],
        account: msalInstance?.getActiveAccount() || undefined,
    }
    return await msalInstance?.acquireTokenSilent(accessTokenRequest).then(tokenResponse => {
        return tokenResponse.accessToken
    }).catch(async (error) => {
        if (error instanceof InteractionRequiredAuthError) {
            console.log(error)
            await msalInstance?.acquireTokenRedirect(accessTokenRequest)
            return undefined
        }
    })
}
