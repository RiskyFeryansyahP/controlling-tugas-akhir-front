import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import fragmentMatcher from './config/apollo/fragmentMatcher'

import App from './App'
import TabMenu from './components/SignIn/TabMenu'
import Content from './components/Content/Content'
import registerServiceWorker from './registerServiceWorker'

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
  uri : 'http://localhost:3000/graphql',
  cache,
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Switch>
          <Route path='/' exact={true} component={TabMenu} />
          <App>
              <Route path='/user' component={Content} />
          </App>
      </Switch>
    </ApolloProvider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
