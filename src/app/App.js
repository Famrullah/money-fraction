import React from 'react';
import Layout from '../layout/layout';
import { Switch, Route } from 'react-router-dom';
import Home from '../component/home/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
