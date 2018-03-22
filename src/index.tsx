import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import reducers from './modules'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

export const store = createStore(reducers, composeWithDevTools({})())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
