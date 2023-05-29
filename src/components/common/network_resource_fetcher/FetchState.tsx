import { fetchConvert } from './FetchOrDefault'

function convertPush(stateId: string | undefined): string {
    return stateId ? stateId : ''
}

export async function PushState(endPoint: string, state: any) {
    return fetchConvert(convertPush,
        `${endPoint}/PushState`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: JSON.stringify(state) }),
        },
        (r: Response) => r.text(),
    ).then()
}


function convertPull(state: any): any {
    return state ? state : {}
}

export async function PullState(endPoint: string, stateId: string) {
    return fetchConvert(convertPull,
        `${endPoint}/PullState?` +
        new URLSearchParams({
            state_id: stateId,
        })
    )
}
