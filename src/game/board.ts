import Coordinate from './coordinate'
import { Piece } from './piece'

const { toNumber, toCoordinate } = Coordinate

// const whitePossibleStartingPositions = (size: Coordinate) => {
//   const locations = new Array<Coordinate>()
//   for (let i = 0; i < 2; i++)
//     for (let j = 0; j < size.y; j++) locations.push({ x: i, y: j })
//   return locations
// }

// const blackPossibleStartingPositions = (size: Coordinate) => {
//   const locations = new Array<{ x: number; y: number }>()
//   for (let i = size.x - 2; i < size.x; i++)
//     for (let j = 0; j < size.y; j++) locations.push({ x: i, y: j })
//   return locations
// }

export class Board {
  size: Coordinate
  get totalPlaces() {
    return this.size.x * this.size.y
  }
  constructor(size: Coordinate) {
    this.size = size
  }

  placeMap = (ps: Piece[]) => {
    const normalizedPlaces = new Array<undefined | Piece>(
      this.totalPlaces
    ).fill(undefined)
    ps.forEach(p => (normalizedPlaces[this.coordinateToNumber(p.c)] = p))
    return normalizedPlaces
  }

  coordinateToNumber = (c: Coordinate) => toNumber(c, this.size)
  numberToCoordinate = (n: number) => toCoordinate(n, this.size)
}
