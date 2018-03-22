import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { sample } from 'lodash'

import { State } from './modules'
import {
  Match,
  init,
  InitAction,
  move,
  MoveAction,
  MovementParam
} from './modules/match'
import { Piece } from './game/piece'
import { Player } from './game/player'
import { Board } from './game/board'
import Coordinate from './game/coordinate'
import { BoardView } from './components/Board'

// SETUP

const cs = [
  new Coordinate({ x: 0, y: 0 }),
  new Coordinate({ x: 0, y: 1 }),
  new Coordinate({ x: 1, y: 0 }),
  new Coordinate({ x: 1, y: 1 })
]

const ps = cs.map(c => ({ c, p: new Piece() }))

const initMatch = {
  player: new Player(ps),
  board: new Board({ x: 5, y: 5 })
}

// APP

interface AppProps {
  match: Match
}

interface AppDispatch {
  init: (match: { board: Board; player: Player }) => InitAction
  move: ({ p, c, oc }: MovementParam) => MoveAction
}

const mapStateToProps = (state: State) => ({
  match: state.match.value
})

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  init: (match: { board: Board; player: Player }) => dispatch(init(match)),
  move: (arg: MovementParam) => dispatch(move(arg))
})

interface AppState {
  isRun: boolean
}

class App extends React.Component<AppProps & AppDispatch, AppState> {
  state = { isRun: false }
  componentWillMount() {
    sample([1, 2, 3])
    this.props.init(initMatch)
  }
  componentDidUpdate() {
    if (!this.state.isRun) {
      const { player } = this.props.match
      const { p, c } = sample(
        player.ps.map((p, c) => ({ p: p!, c: c! })).toArray()
      )!
      this.props.move({ p, c, oc: { x: 3, y: 3 } })
      this.setState({ isRun: true })
    }
  }
  render() {
    if (!this.props.match) {
      return null
    }
    const { ...rest } = this.props.match
    return <BoardView {...rest} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
