import { Piece } from '../game/piece'
import { Player } from '../game/player'
import { Board } from '../game/board'
import Coordinate from '../game/coordinate'
import { Maybe } from '../util/type'

const MOVE = '@@match/move'
const REMOVE = '@@match/remove'
const INIT = '@@match/init'

export interface Match {
  player: Player
  board: Board
}

export type MovementParam = { p: Piece; c: Coordinate; oc: Coordinate }
export type InitParam = Match

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

export interface MatchState {
  value: Maybe<Match>
}

const initState: MatchState = {
  value: undefined
}

export function reducer(
  state: MatchState = initState,
  action: Action
): MatchState {
  // All non-init actions throw if match is not initialized
  if (
    !(action.type === INIT || /@@redux|@@INIT/.test(action.type)) &&
    !state.value
  ) {
    console.log(action, INIT)
    throw new Error('Need to setup the board first')
  }
  // Initializing the board again would reset the game.
  if (action.type === INIT && state.value) {
    throw new Error("Don't initialize the board twice")
  }

  switch (action.type) {
    case INIT: {
      const { player, board } = action.payload
      return { ...state, value: { player, board } }
    }
    case MOVE: {
      const { oc, c, p } = action.payload
      const { player } = state.value!
      player.ps = player.ps.set(oc, p).remove(c)
      return {
        ...state,
        value: { ...state.value!, player }
      }
    }
    case REMOVE: {
      const c = action.payload
      const { player } = state.value!
      player.ps = player.ps.remove(c)
      return { ...state, value: { ...state.value!, player } }
    }
    default: {
      return state
    }
  }
}
