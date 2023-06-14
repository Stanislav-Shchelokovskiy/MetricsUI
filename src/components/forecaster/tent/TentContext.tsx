import React, { createContext, useContext } from 'react'

export const TentIdContext = createContext<string>('')

export function useTentId() {
    return useContext(TentIdContext)
}
