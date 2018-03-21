import { createAction, createReducer } from 'redux-typed-action'

export interface TestState {
  test?: boolean
  quantity?: number
}

export const testActions = {
  add: createAction<TestState, 1>('ADD', (state, payload) => ({
    ...state,
    quantity: state.quantity ? state.quantity + payload : 1
  })),
  toggle: createAction<TestState>('TOGGLE', state => {
    console.log(state)
    return {
      ...state,
      test: state.test ? !state.test : true
    }
  })
}

export default createReducer(testActions, { test: true, quantity: 7 })

// Other way

const ADD = 'add'
const TOGGLE = 'toggle'

export interface AddAction {
  type: typeof ADD
}

export interface ToggleAction {
  type: typeof TOGGLE
}

export type Action = AddAction | ToggleAction

export const add: () => AddAction = () => ({ type: ADD })
export const toggle: () => ToggleAction = () => ({ type: TOGGLE })

export function reducer(state: TestState = {}, action: Action) {
  switch (action.type) {
    case ADD:
      const quantity = state.quantity !== undefined ? state.quantity + 1 : 0
      return {
        ...state,
        quantity
      }
    case TOGGLE:
      const test = !state.test
      console.log('test', test)
      return { ...state, test }
    default:
      return state
  }
}
