import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { State } from '../modules'

import {
  TestState,
  add,
  toggle,
  AddAction,
  ToggleAction
} from '../modules/test'

interface Props {
  test: boolean
  quantity: number
}

interface TestDispatch {
  add: () => AddAction
  toggle: () => ToggleAction
}

const mapStateToProps = (state: State) => ({
  test: state.altTest.test,
  quantity: state.altTest.quantity
})

const mapDispatchToProps = (dispatch: Dispatch<TestState>) => ({
  add: () => dispatch(add()),
  toggle: () => dispatch(toggle())
})

const Test = ({ test, quantity, add, toggle }: Props & TestDispatch) => (
  <div>
    {test ? quantity : null}
    <button
      onClick={e => {
        add()
        toggle()
      }}
    >
      {'click'}
    </button>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Test)
