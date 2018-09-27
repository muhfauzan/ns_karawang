import React from 'react'
//import HeaderLogo from '../../components/HeaderLogo'
//import Header from '../../components/Header'
import MenuHeader from '../../components/MenuHeader'
import Main from '../../routes'

export default class App extends React.Component {
  render () {
    return (
      <div>
        {/*
        <HeaderLogo />
        <Header /> 
        */}
        <MenuHeader />
        <Main />
      </div>
    )
  }
}
