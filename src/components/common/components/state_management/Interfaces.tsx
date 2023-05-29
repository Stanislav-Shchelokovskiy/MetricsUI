import { PopupProps, ComponentProps } from '../../Interfaces'

interface StorageProps {
    stateSalt: string
}

export interface ValuesProps extends StorageProps, ComponentProps {
    stateNamesSelector: (state: any) => Array<string>
}

export interface KeyProps extends StorageProps, ComponentProps {
    stateNameSelector: (state: any) => string
}

export interface StateProps extends StorageProps, ComponentProps {
    statePropsSelector: (state: any) => any,
    endPoint: string,
}

export type ValuesPopupProps = PopupProps & ValuesProps
