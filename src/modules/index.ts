import { combineReducers } from 'redux'

import test, { TestState, reducer as testReducer } from './test'
import { BoardState, reducer as boardReducer } from './board'

export interface State {
  board: BoardState
  test: TestState
  altTest: TestState
}

export default combineReducers<State>({
  test,
  altTest: testReducer,
  board: boardReducer
})
