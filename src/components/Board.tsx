import * as React from 'react'

import Coordinate from '../game/coordinate'
import { Player } from '../game/player'
import { Piece } from '../game/piece'
import { Board } from '../game/board'
import {
  Grid,
  Piece as PieceDiv,
  BlackSquare,
  WhiteSquare
} from './primitives/div'

const isBlackSquare = (index: Coordinate) =>
  Boolean(index.x % 2 || index.y % 2) && !(index.x % 2 && index.y % 2)

export const BoardView = ({ b, player }: { b: Board; player: Player }) => {
  const places = b.placeMap(player.ps)
  const BoardGrid = Grid(b)
  return (
    <BoardGrid>
      {places.map((place, index) => (
        <PlaceView
          isBlackSquare={isBlackSquare(b.numberToCoordinate(index))}
          key={index}
          p={place}
        />
      ))}
    </BoardGrid>
  )
}

const PlaceView = (props: { p: Piece | undefined; isBlackSquare: boolean }) => {
  const Square = props.isBlackSquare ? BlackSquare : WhiteSquare
  return (
    <Square>{props.p ? <PieceView symbol={props.p.symbol} /> : null}</Square>
  )
}

const PieceView = ({ symbol }: { symbol: string }) => (
  <PieceDiv>{symbol}</PieceDiv>
)
