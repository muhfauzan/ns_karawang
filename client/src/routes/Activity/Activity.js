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
        this.deleteActivity = this.deleteActivity.bind(this);
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

    deleteActivity(activity){
    console.log("activity: ", activity)
    var data = {
        id: activity.id
    }
    console.log("data: ", data)
    fetch("/api/delact", {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data === "success"){
               this.refs.msg.show('Some text or component', {
                  time: 2000,
                  type: 'success'
                })
            }
        }).catch(function(err) {
            console.log(err)
    });
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
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pageOfItems.map(act => 
                        <tr key={act.id}>
                            <td>{act.site_id} </td>
                            <td>{act.site_name} </td>
                            <td>{act.category}</td>
                            <td>{act.activity}</td>
                            <td>{dateFormat(act.act_date, "fullDate")}</td>    
                            <td><button className="btn btn-danger" onClick={() => this.deleteActivity(act)}>Delete</button></td>                 
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