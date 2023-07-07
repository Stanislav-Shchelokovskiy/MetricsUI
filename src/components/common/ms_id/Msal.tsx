import { PublicClientApplication, EventType, EventMessage } from '@azure/msal-browser'
import { MSAL_CONFIG } from './AuthConfig'



function setActiveAccount(msalInstance: PublicClientApplication) {
    if (!msalInstance.getActiveAccount()) {
        resetActiveAccount(msalInstance)
    }
}

function resetActiveAccount(msalInstance: PublicClientApplication) {
    if (msalInstance.getAllAccounts().length > 0) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
    }
}

export function getMsalInstance() {
    const msalInstance = new PublicClientApplication(MSAL_CONFIG)

    setActiveAccount(msalInstance)

    msalInstance.addEventCallback((event: EventMessage) => {
        switch (event.eventType) {
            case EventType.LOGIN_SUCCESS:
                setActiveAccount(msalInstance)
                break
            case EventType.LOGOUT_SUCCESS:
                resetActiveAccount(msalInstance)
                break
            case EventType.LOGIN_FAILURE:
                console.log(JSON.stringify(event))
                break
        }
    })

    return msalInstance
}

