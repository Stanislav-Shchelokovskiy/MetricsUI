import { LogLevel } from '@azure/msal-browser';
import { BrowserCacheLocation } from '@azure/msal-browser';
import { MSID_REDIRECT } from '../EndPoint';

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: 'b66011cb-5d1f-4a6d-a16c-c7ddf5138ffd',
        authority: 'https://login.microsoftonline.com/e4d60396-9352-4ae8-b84c-e69244584fa4',
        redirectUri: MSID_REDIRECT
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
        secureCookies: true,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ['User.Read']
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
};
