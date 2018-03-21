import { Piece } from '../game/piece'
import { Player } from '../game/player'
import { Board } from '../game/board'
import Coordinate from '../game/coordinate'
import { Maybe } from '../util/type'

const MOVE = '@@board/move'
const REMOVE = '@@board/remove'
const INIT = '@@board/init'

export type MovementParam = { p: Piece; c: Coordinate }
export type InitParam = { player: Player; board: Board }

export interface MoveAction {
  type: typeof MOVE
  payload: MovementParam
}

interface RemoveAction {
  type: typeof REMOVE
  payload: Piece
}

export interface InitAction {
  type: typeof INIT
  payload: InitParam
}

export type Action = InitAction | MoveAction | RemoveAction

export const init = ({ player, board }: InitParam): InitAction => ({
  type: INIT,
  payload: { player, board }
})

export const move = ({ p, c }: MovementParam): MoveAction => ({
  type: MOVE,
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
    throw new Error('Need to setup the board first')
  }
  if (action.type === INIT && state.setup) {
    throw new Error("Don't initialize the board twice")
  }

  // TODO These should totally be pure functions. At some point, replace these
  // underlying data structures with immutable-js structures or similar.
  // Immutable in particular has O(log_32 n) accessor functions
  switch (action.type) {
    case REMOVE: {
      const player = state.setup!.player
      const index = player.ps.indexOf(action.payload)
      delete player.ps[index]
      return { ...state, setup: { ...state.setup, player } }
    }
    case MOVE: {
      action.payload.p.c = action.payload.c
      return state
    }
    case INIT: {
      const { player, board } = action.payload
      return { ...state, setup: { player, board } }
    }
    default: {
      return state
    }
  }
}
