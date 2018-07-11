import React from 'react'
import HeaderComponent from '../../components/HeaderComponent'
//import Header from '../../components/Header'
import MenuExampleVerticalSecondary from '../../components/MenuExampleVerticalSecondary'
import Main from '../../routes'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <HeaderComponent />
        {/* <Header /> */}
        <MenuExampleVerticalSecondary />
        <Main />
      </div>
    )
  }
}
