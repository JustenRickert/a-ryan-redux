import { combineReducers } from 'redux'

import { MatchState, reducer as matchReducer } from './match'

export interface State {
  match: MatchState
}

export default combineReducers<State>({
  match: matchReducer
})
