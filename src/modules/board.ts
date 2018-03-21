import { Piece } from '../game/piece'
import { Player } from '../game/player'
import { Board } from '../game/board'
import Coordinate from '../game/coordinate'
import { Maybe } from '../util/type'

const MOVE = '@@board/emove'
const PLACE = '@@board/place'
const REMOVE = '@@board/remove'
const INIT = '@@board/init'

export interface MoveAction {
  type: typeof MOVE
  payload: { p: Piece; c: Coordinate }
}

interface PlaceAction {
  type: typeof PLACE
  payload: { p: Piece; c: Coordinate }
}

interface RemoveAction {
  type: typeof REMOVE
  payload: Piece
}

export interface InitAction {
  type: typeof INIT
  payload: { player: Player; board: Board }
}

export type Action = MoveAction | InitAction | PlaceAction | RemoveAction

export const move = ({ p, c }: { p: Piece; c: Coordinate }): MoveAction => ({
  type: MOVE,
  payload: { p, c }
})

export const init = ({
  player,
  board
}: {
  player: Player
  board: Board
}): InitAction => ({
  type: INIT,
  payload: { player, board }
})

export const place = ({ p, c }: { p: Piece; c: Coordinate }): PlaceAction => ({
  type: PLACE,
  payload: { p, c }
})

export const remove = ({ p }: { p: Piece }): RemoveAction => ({
  type: REMOVE,
  payload: p
})

export interface BoardState {
  isInitialized: boolean
  setup: Maybe<{
    player: Player
    board: Board
  }>
}

const initState: BoardState = {
  isInitialized: false,
  setup: undefined
}

export function reducer(state: BoardState = initState, action: Action) {
  if (!(action.type === INIT || /@@redux/.test(action.type)) && !state.setup) {
    console.log(action)
    throw new Error('Need to setup the board first')
  }
  if (action.type === INIT && state.setup) {
    throw new Error("Don't initialize the board twice")
  }

  switch (action.type) {
    // case MOVE:
    // case REMOVE:
    // case PLACE:
    //   const { board } = state.setup
    //   return
    case INIT:
      const { player, board } = action.payload
      return { ...state, setup: { player, board } }
    default:
      return state
  }
}
