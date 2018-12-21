import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import App from './components/App/App';

import Home from './components/Home/Home';

import './styles/styles.sass';

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
