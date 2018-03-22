import { Piece } from '../game/piece'
import { Player } from '../game/player'
import { Board } from '../game/board'
import Coordinate from '../game/coordinate'
import { Maybe } from '../util/type'

const MOVE = '@@board/move'
const REMOVE = '@@board/remove'
const INIT = '@@board/init'

export type MovementParam = { p: Piece; c: Coordinate; oc: Coordinate }
export type InitParam = { player: Player; board: Board }

export interface MoveAction {
  type: typeof MOVE
  payload: MovementParam
}

interface RemoveAction {
  type: typeof REMOVE
  payload: Coordinate
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

export const move = ({ p, c, oc }: MovementParam): MoveAction => ({
  type: MOVE,
  payload: { p, c, oc }
})

export const remove = ({ c }: { c: Coordinate }): RemoveAction => ({
  type: REMOVE,
  payload: c
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

export function reducer(
  state: BoardState = initState,
  action: Action
): BoardState {
  if (!(action.type === INIT || /@@redux/.test(action.type)) && !state.setup) {
    throw new Error('Need to setup the board first')
  }
  if (action.type === INIT && state.setup) {
    throw new Error("Don't initialize the board twice")
  }

  switch (action.type) {
    case REMOVE: {
      const c = action.payload
      const { player } = state.setup!
      player.ps = player.ps.remove(c)
      return { ...state, setup: { ...state.setup!, player } }
    }
    case MOVE: {
      const { oc, c, p } = action.payload
      const { player } = state.setup!
      player.ps = player.ps.set(c, p)
      const newState: BoardState = {
        ...state,
        setup: { ...state.setup!, player }
      }
      const stateAfterOldCRemoval = reducer(newState, <RemoveAction>{
        type: REMOVE,
        payload: oc
      })
      return stateAfterOldCRemoval
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
