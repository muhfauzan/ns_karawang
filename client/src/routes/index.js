import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Activity from './Activity'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/activity' component={Activity}/>
    </Switch>
  </main>
)

export default Main