import React, { Component } from 'react';
//var dateFormat = require('dateformat');

export default class Site extends Component {
	constructor(props) {
        super(props)
        this.state = {
            sites: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch('/api/sites', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({sites: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

	render() {
        return (
	      <div className="container"> 
            <div className="panel panel-default p5000 uth-panel">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Site Id</th>
                            <th>Site Name</th>
                            <th>RTP</th>
                            <th>Cluster</th>
                            <th>Kecamatan</th>
                            <th>Kabupaten</th>
                            <th>TP</th>
                            <th>Tower Type</th>
                            <th>Tower Height</th>
                            <th>Site Type</th>                            
                            <th>Longitude</th>
                            <th>Latitude</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.sites.map(member =>
                        <tr key={member.site_id}>
                        <td>{member.site_id} </td>
                        <td>{member.site_name} </td>
                        <td>{member.rtp} </td>
                        <td>{member.cluster}</td>
                        <td>{member.kecamatan}</td>
                        <td>{member.kabupaten} </td>
                        <td>{member.tower_prov} </td>
                        <td>{member.tower_type}</td>
                        <td>{member.tower_high}</td>
                        <td>{member.site_type}</td>
                        <td>{member.longitude}</td>
                        <td>{member.latitude}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    	);
	}
}