import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import { Router, Route, browserHistory } from 'react-router'
import Root from './containers/Root'
import dialogs from './reducers/dialogs'

const networkInterface = createNetworkInterface('http://localhost:7080/graphql')
const client = new ApolloClient({networkInterface})
const store = configureStore()

function configureStore (initialState) {
  const store = createStore(
    combineReducers({
      dialogs,
      apollo: client.reducer()
    }),
    initialState,
    compose(
        applyMiddleware(client.middleware()),
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )

  return store
}

export default function App () {
  return (
    <ApolloProvider store={store} client={client}>
      <Router history={browserHistory}>
        <Route path='/' component={Root} />
      </Router>
    </ApolloProvider>
  )
}
