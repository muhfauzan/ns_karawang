import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Site from './Site'
import AddSite from './AddSite'
import Battery from './Battery'
import AddBattery from './AddBattery'
import Rectifier from './Rectifier'
import AddRectifier from './AddRectifier'
import Eas from './Eas'
import Transport from './Transport'
import Genset from './Genset'
import Activity from './Activity'
import AddActivity from './AddActivity'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/site' component={Site}/>
      <Route path='/battery' component={Battery}/>
      <Route path='/addbattery' component={AddBattery}/>
      <Route path='/rectifier' component={Rectifier}/>
      <Route path='/addrectifier' component={AddRectifier}/>
      <Route path='/eas' component={Eas}/>
      <Route path='/transport' component={Transport}/>
      <Route path='/genset' component={Genset}/>
      <Route path='/activity' component={Activity}/>
      <Route path='/addactivity' component={AddActivity}/>
      <Route path='/addsite' component={AddSite}/>
    </Switch>
  </main>
)

export default Main