import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'

export default createStore(() => { }, applyMiddleware(logger))
