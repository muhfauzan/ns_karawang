import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Activity from './Activity'
import Activity2 from './Activity2'
import Site_Pagination from './Site_Pagination'
import NewActivity from './NewActivity'
import ActivitySiteId from './ActivitySiteId'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/activity' component={Activity}/>
      <Route path='/activity2' component={Activity2}/>
      <Route path='/activity/:siteid' component={ActivitySiteId}/>
      <Route path='/site_pagination' component={Site_Pagination}/>
      <Route path='/newactivity' component={NewActivity}/>
    </Switch>
  </main>
)

export default Main