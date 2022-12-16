import { SUPPORT_ANALYTICS_END_POINT } from '../EndPoint'

export async function PushState(state: any) {
    try {
        const stateId = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/push_state`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: JSON.stringify(state) }),
        }).then(response => response.text())
        return {
            success: true,
            data: stateId
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: ''
        }
    }
}

export async function PullState(stateId: string) {
    try {
        const state = await fetch(`${SUPPORT_ANALYTICS_END_POINT}/pull_state?` +
            new URLSearchParams({
                state_id: stateId,
            })
        ).then(response => response.json())
        return {
            success: true,
            data: state
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: {}
        }
    }
}
