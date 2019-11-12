import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ShowQueries } from './components/ShowQueries';
import { ShowMatch } from './components/ShowMatch';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/fetchdata' component={ShowQueries} />
            <Route path='/showmatch' component={ShowMatch} />
      </Layout>
    );
  }
}
