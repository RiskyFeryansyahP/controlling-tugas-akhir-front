import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import fragmentMatcher from './config/apollo/fragmentMatcher'
import store from './store'

import App from './App'
import TabMenu from './components/SignIn/TabMenu'
import Content from './components/Content/Content'
import CreateTugas from './components/Tugas/CreateTugas'
import MeetingBook from './components/Meeting/MeetingBook'

import registerServiceWorker from './registerServiceWorker'

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
  uri : 'http://localhost:3000/graphql',
  cache,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
        <Router>
              <Switch>
                  <Route path='/' exact={true} component={TabMenu} />
                  <App>
                      <Route path='/user' component={Content} />
                      <Route path='/tugas' component={CreateTugas} />
                      <Route path='/meet' component={MeetingBook} />
                  </App>
              </Switch>
        </Router>
      </Provider>
    </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
