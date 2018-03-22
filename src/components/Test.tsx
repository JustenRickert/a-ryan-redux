import * as React from 'react'

import { AddAction, ToggleAction } from '../modules/test'

interface Props {
  test: boolean
  quantity: number
}

interface TestDispatch {
  add: () => AddAction
  toggle: () => ToggleAction
}

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

export default Test
