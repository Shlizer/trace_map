import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import store from './store'
import './reset.css'
import './globals.scss'
import './variables.scss'

const rootElement = document.getElementById('root')
const render = () =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    rootElement
  )

render()

if (module.hot) {
  module.hot.accept('./', () => render())
}
