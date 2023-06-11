import React, { createContext, useContext } from 'react'

export const SetTitleContext = createContext<string>('')

export function useSetTitle() {
    return useContext(SetTitleContext)
}
