import { Map } from 'immutable'
import Coordinate from './coordinate'
import { Piece } from './piece'

export class Player {
  ps: Map<Coordinate, Piece>
  constructor(ps: { c: Coordinate; p: Piece }[]) {
    this.ps = ps.reduce(
      (map, p) => map.set(p.c, p.p),
      Map<Coordinate, Piece>({})
    )
  }
}
