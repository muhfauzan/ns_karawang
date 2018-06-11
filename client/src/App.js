import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import logo from './blood_bank.png';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      acts: []
    };
  }

  componentDidMount() {
    let self = this;
    fetch('/api/act', {
      method: 'GET'
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(acts) {
      self.setState({acts: acts.response});
    }).catch(err => {
      console.log('caught it!',err);
    })
  }

  render() {
    var myStyle = {
         fontSize: 15,
         color: 'white',
         background: 'red'
      }
      var style = {
        backgroundImage: "url(" + logo + ")",
        backgroundSize: "contain",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        display: "inline-block",
        backgroundRepeat: "no-repeat"
      }
    return (
      <div className="App">
      <a href="/" className="logo-a"><span style={style}></span></a>
      <a href="/" className="logo-a"><span style={style}></span></a>
        <header className="App-header">
          <h1 className="App-title" style = {myStyle} >Site Activity NS Karawang</h1>
        </header>

        <BootstrapTable data={ this.state.acts }>
          <TableHeaderColumn dataField='site_id' isKey={ true }>Site ID</TableHeaderColumn>
          <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='activity'>Activity</TableHeaderColumn>
          <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
        </BootstrapTable>        
      </div>
    );
  }
}
export default App;
