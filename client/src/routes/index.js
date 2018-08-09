import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Activity from './Activity'
import Site from './Site'
import Site_Pagination from './Site_Pagination'
import NewActivity from './NewActivity'
import NewActivity2 from './NewActivity2'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/activity' component={Activity}/>
      <Route path='/site' component={Site}/>
      <Route path='/site_pagination' component={Site_Pagination}/>
      <Route path='/newactivity' component={NewActivity}/>
    </Switch>
  </main>
)

export default Main