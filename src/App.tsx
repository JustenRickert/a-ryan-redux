import * as React from 'react'

import { Piece } from './game/piece'
import { Player } from './game/player'
import { Board } from './game/board'
import Coordinate from './game/coordinate'
import { BoardView } from './components/Board'

import './App.css'

const cs = [
  new Coordinate({ x: 0, y: 0 }),
  new Coordinate({ x: 0, y: 1 }),
  new Coordinate({ x: 1, y: 0 }),
  new Coordinate({ x: 1, y: 1 })
]

const ps = cs.map(c => new Piece(c))

const setup = {
  player: new Player(ps),
  b: new Board({ x: 5, y: 5 })
}

class App extends React.Component {
  render() {
    return <BoardView {...setup} />
  }
}

export default App
