import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './index.css'
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory, createHashHistory } from 'history'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { Router } from 'react-router-dom'

import rootReducer from './reducers'

const history = process.env.PUBLIC_URL.search(/^image/) === -1 ? createBrowserHistory() : createHashHistory()

const store = createStore(
    rootReducer,
    applyMiddleware(
        routerMiddleware(history)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
