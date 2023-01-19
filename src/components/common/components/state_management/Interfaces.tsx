import { PopupProps, ComponentProps } from '../../Interfaces'

interface StorageProps {
    state_salt: string
}

export interface ValuesProps extends StorageProps, ComponentProps {
    valuesSelector: (state: any) => Array<string>
}

export interface KeyProps extends StorageProps, ComponentProps {
    keySelector: (state: any) => string
}

export type ValuesPopupProps = PopupProps & ValuesProps
