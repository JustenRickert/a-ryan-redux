import { combineReducers } from 'redux'

import test, { TestState, reducer as testReducer } from './test'

export interface State {
  test: TestState
  altTest: TestState
}

export default combineReducers<State>({ test, altTest: testReducer })
