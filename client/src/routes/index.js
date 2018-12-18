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
import AddEas from './AddEas'
import Transport from './Transport'
import AddTransport from './AddTransport'
import Genset from './Genset'
import AddGenset from './AddGenset'
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
      <Route path='/addeas' component={AddEas}/>
      <Route path='/transport' component={Transport}/>
      <Route path='/addtransport' component={AddTransport}/>
      <Route path='/genset' component={Genset}/>
      <Route path='/addgenset' component={AddGenset}/>
      <Route path='/activity' component={Activity}/>
      <Route path='/addactivity' component={AddActivity}/>
      <Route path='/addsite' component={AddSite}/>
    </Switch>
  </main>
)

export default Main