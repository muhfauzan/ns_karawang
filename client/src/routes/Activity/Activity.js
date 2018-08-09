import React from 'react';
import Pagination from '../../components/Pagination';
var dateFormat = require('dateformat');

export default class Activity extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            acts: [],
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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
            <a href="/newactivity" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Activity</a>
            <p></p>
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Site Id</th>
                            <th>Site Name</th>
                            <th>Category</th>
                            <th>Activity</th>
                            <th>Date</th>
                            {/*<th>Action</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pageOfItems.map(member =>
                        <tr key={member.id}>
                        <td>{member.site_id} </td>
                        <td>{member.site_name} </td>
                        <td>{member.category}</td>
                        <td>{member.activity}</td>
                        <td>{dateFormat(member.act_date, "fullDate")}</td>
                        {/*<td><a>Edit</a>|<a>Delete</a></td>*/}
                        </tr>
                    )}
                    </tbody>
                </table>
                <center>
                <Pagination items={this.state.acts} onChangePage={this.onChangePage} />
                </center>
            </div>
        </div>
    	);
	}
}