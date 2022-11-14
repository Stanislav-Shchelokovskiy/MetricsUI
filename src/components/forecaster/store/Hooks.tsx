import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { ForecasterState, ForecasterDispatch } from './ForecasterState'

export const useForecasterDispatch: () => ForecasterDispatch = useDispatch
export const useForecasterSelector: TypedUseSelectorHook<ForecasterState> = useSelector