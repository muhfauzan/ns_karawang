var React = require('react');
var createClassReact = require('example-create-react-app-express');
var App = React.createClassReact({
  getInitialState: function() {
    return {
      act: []
    };
  },
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(acts => this.setState({ acts: acts }));
  },
  render: function() {
    return (
        <div className="Acts">
          <h1>Users</h1>
          {this.state.acts.map(act =>
            <div key={act.id}>{act.site_id} {act.category} - {act.activity}</div>
          )}
        </div>
    );
  }
});

module.exports = App;