import Coordinate from './coordinate'

export class Piece {
  symbol = 'P'
  c: Coordinate
  constructor(c: Coordinate) {
    this.c = c
  }
}
