import React from 'react';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-modal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Activity extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            acts: [],
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
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
        }).then(function(data) {
            self.setState({acts: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    openModal(act) {
        this.setState({
            modalIsOpen: true,
            id: act.id,
            siteid: act.site_id,
            category: act.category,
            activity: act.activity,
            act_date: act.act_date
        });
        console.log(act)
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
        var data = {
            id:this.state.id,
            siteid: this.state.siteid,
            category: this.state.category,
            activity: this.state.activity,
            date: this.state.date 
        }
        console.log(data)
        fetch("/api/modify_activity",  {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
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
        this.props.history.push('/activity');
    }

    deleteActivity(activity){
    console.log("activity: ", activity)
    var data = {
        id: activity.id
    }
    console.log("data: ", data)
    fetch("/api/delete_activity", {
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
    this.props.history.push('/activity');
    }

	render() {
        return (
            <div className="container"> 
                <a href="/addactivity" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Activity</a> 
                
                <p></p>
                <div className="panel panel-default p50 uth-panel">
                <ReactTable
                    data={this.state.acts}
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                    columns={[
                    {
                        filterable: false,
                        width: 82,
                        Cell: row => (
                            <button className="btn btn-primary" onClick={() => this.openModal(row.original)}>Edit</button>                             
                        )
                    },
                    {
                        filterable: false,
                        width: 100,
                        Cell: row => (
                            <button className="btn btn-danger" onClick={() => this.deleteActivity(row.original)}>Delete</button> 
                        )
                    },
                    {
                        Header: "Site Id",
                        accessor: "site_id"              
                    },
                    {
                        Header: "Site Name",
                        accessor: "site_name"
                    },
                    {
                        Header: "Category",
                        accessor: "category"              
                    },
                    {
                        Header: "Activity",
                        accessor: "activity"
                    },
                    {
                        Header: "Date",
                        accessor: "act_date"
                    }                    
                    ]}                    
                />    
                <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Edit Activity Modal" >
                                    <form onSubmit={this.handleEdit} method="POST">
                                        <div className="panel panel-default p50 uth-panel">
                                            <div className="panel-body uth-panel-body">
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Site Id</label>
                                                        <input onChange={this.logChange} className="form-control" name='siteid' value={this.state.siteid}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Category</label>
                                                        <input onChange={this.logChange} className="form-control" name='category' value={this.state.category}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Activity</label>
                                                        <input onChange={this.logChange} className="form-control" name='activity' value={this.state.activity}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Date</label>
                                                        <input onChange={this.logChange} className="form-control" name='actdate' value={this.state.actdate}/>
                                                    </div>
                                                </div>
                                                <div className="submit-section">
                                                    <button className="btn btn-danger" onClick={this.closeModal}>Cancel</button> <button class="btn btn-secondary" >Submit</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </form>
                        </Modal> 

                <ExcelFile element={
                <button type="button" class="btn btn-primary btn-sm">Download All Activity Data</button>}>
                <ExcelSheet data={this.state.acts} name="Activity">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="Category" value="category"/>
                <ExcelColumn label="Activity" value="activity"/>
                <ExcelColumn label="Activity Date" value="act_date"/>
                </ExcelSheet>
                </ExcelFile>  

                </div>
            </div>
        );
      }
}