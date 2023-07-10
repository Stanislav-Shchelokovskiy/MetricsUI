import { useMsal } from "@azure/msal-react"
import { AccountInfo } from "@azure/msal-browser"

enum Role {
    Basic = 'Basic',
    Advanced = 'Advanced',
    Admin = 'Admin',
}


export function getRole(account: AccountInfo | undefined): string {
    return getRoleFromClaims(account?.idTokenClaims)
}

function getRoleFromClaims(claims: { roles?: Array<string> } | undefined): string {
    if (claims !== undefined && claims.roles !== undefined) {
        if (claims.roles.includes(Role.Advanced))
            return Role.Advanced
        if (claims.roles.includes(Role.Admin))
            return Role.Admin
    }
    return Role.Basic
}
