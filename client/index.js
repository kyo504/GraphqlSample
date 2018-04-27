import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHisotry, IndexRoute } from 'react-router';

import App from './components/App';
import SongList from './components/SongList';

const client = new ApolloClient();

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHisotry}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
