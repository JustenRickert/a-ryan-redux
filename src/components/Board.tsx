import * as React from 'react'

import { Match } from '../modules/match'
import Coordinate from '../game/coordinate'
import { Piece } from '../game/piece'
import {
  Grid,
  Piece as PieceDiv,
  BlackSquare,
  WhiteSquare
} from './primitives/div'

const isBlackSquare = (index: Coordinate) =>
  Boolean(index.x % 2 || index.y % 2) && !(index.x % 2 && index.y % 2)

export const BoardView = ({ board, player }: Match) => {
  const places = board.placeMap(player.ps)
  console.log(places)
  const BoardGrid = Grid(board)
  return (
    <BoardGrid>
      {places.map((place, index) => (
        <PlaceView
          isBlackSquare={isBlackSquare(board.numberToCoordinate(index))}
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
