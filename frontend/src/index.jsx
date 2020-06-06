import React from 'react'
import ReactDOM from 'react-dom'
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
      <App />
    </AppContainer>,
    rootElement
  )

render()

if (module.hot) {
  module.hot.accept('./', () => render())
}
