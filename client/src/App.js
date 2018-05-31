import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
       super();
       this.state = {acts: []};
  }

   componentDidMount() {
          fetch('/api/act')
            .then(res => res.json())
            .then(acts => this.setState({ acts: acts }));
         }
   render() {
        return (
            <div className="App">
                <h1>Acts</h1>
                {this.state.acts.map(act =>
                <div key={act.id}>date: {act.date} activity: {act.activity}</div>
              )}
            </div>
        );
    }
}
export default App;
