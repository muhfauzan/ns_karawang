import React from 'react';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-modal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Eas extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            eas: [],
            modailIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this); 
    }

    componentDidMount() {
        let self = this;
        fetch('/api/eas', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({eas: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    openModal(eas) {
        this.setState({
            modalIsOpen: true,
            siteid: eas.site_id,
            mains_fail: eas.mains_fail,
            modulerecti_fail: eas.modulerecti_fail,
            battery_stolen: eas.battery_stolen
        });
        console.log(eas)
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
            site_id: this.state.siteid,
            mains_fail: this.state.mains_fail,
            modulerecti_fail: this.state.modulerecti_fail,            
            battery_stolen: this.state.battery_stolen
        }
        console.log(data)
        fetch("/api/modify_eas",  {
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
        this.props.history.push('/eas');
    }

    deleteBattery(eas) {
    console.log("eas: ", eas)
    var data = {
        site_id: eas.site_id
    }
    console.log("data: ", data)
    fetch("/api/delete_eas", {
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
    this.props.history.push('/eas');
    }     

      
  render() {
        return (
            
        <div className="container">                         
            <a href="/addeas" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New EAS</a> 

            <p></p>

            <div className="panel panel-default p50 uth-panel">
            
            <ReactTable
                    data={this.state.eas}
                    filterable
                    defaultPageSize={10}
                    className="-striped -highlight"
                    columns={[
                    {
                        Header: "Site Id",
                        accessor: "site_id"              
                    },
                    {
                        Header: "Site Name",
                        accessor: "site_name"
                    },
                    {
                        Header: "Mains Fail",
                        accessor: "mains_fail"              
                    },
                    {
                        Header: "Modulerecti Fail",
                        accessor: "modulerecti_fail"
                    },
                    {
                        Header: "Battery Stolen",
                        accessor: "battery_stolen"
                    },
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
                            <button className="btn btn-danger" onClick={() => this.deleteBattery(row.original)}>Delete</button>  
                        )
                    }
                    ]}                    
                />

                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Edit EAS Modal" >
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
                                        <label>Mains Fail</label>
                                            <input onChange={this.logChange} className="form-control" name='mains_fail' value={this.state.mains_fail}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Module Recti Fail</label>
                                        <input onChange={this.logChange} className="form-control" name='modulerecti_fail' value={this.state.modulerecti_fail}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Battery Stollen</label>
                                            <input onChange={this.logChange} className="form-control" name='battery_stolen' value={this.state.battery_stolen}/>
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
                <button type="button" class="btn btn-primary btn-sm">Download All EAS Data</button>}>
                <ExcelSheet data={this.state.eas} name="EAS">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="Mains Fail" value="mains_fail"/>
                <ExcelColumn label="Module Recti Fail" value="modulerecti_fail"/>
                <ExcelColumn label="Batter Stollen" value="battery_stolen"/>
                </ExcelSheet>
            </ExcelFile>

            </div>
        </div>
      );
  }
}