import React, { Component } from 'react';

export default class Activity extends Component {
	constructor(props) {
        super(props)
        this.state = {
            acts: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/api/acts', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({acts: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

	render() {
        return (
	      <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Site ID</th>
                            <th>Category</th>
                            <th>Activity</th>
                            <th>Date</th>
                            {/*<th>Action</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.acts.map(member =>
                        <tr key={member.id}>
                        <td>{member.site_id} </td>
                        <td>{member.category}</td>
                        <td>{member.activity}</td>
                        <td>{member.date}</td>
                        {/*<td><a>Edit</a>|<a>Delete</a></td>*/}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    	);
	}
}