import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State } from './modules'
import { init, InitAction } from './modules/board'
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

const initSetup = {
  player: new Player(ps),
  board: new Board({ x: 5, y: 5 })
}

// BOARD VIEW

const mapStateToBoardProps = (state: State) => ({
  b: state.board.setup!.board,
  player: state.board.setup!.player
})

const ConnectedBoardView = connect(mapStateToBoardProps)(BoardView)

// APP

interface AppDispatch {
  init: (setup: { board: Board; player: Player }) => InitAction
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
  init: (setup: { board: Board; player: Player }) => dispatch(init(setup))
})

class App extends React.Component<AppDispatch, {}> {
  componentWillMount() {
    this.props.init(initSetup)
  }
  render() {
    return <ConnectedBoardView />
  }
}

export default connect(undefined, mapDispatchToProps)(App)
