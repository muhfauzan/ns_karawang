import React from 'react';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-modal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Battery extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            battery: [],
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);   
    }

    componentDidMount() {
        let self = this;
        fetch('/api/battery', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({battery: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }  

    openModal(act) {
        this.setState({
            modalIsOpen: true,
            siteid: act.site_id,
            brand: act.brand,
            bank: act.bank,
            install_date: act.install_date,
            protection: act.protection,
            backup_time: act.backup_time
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
            site_id: this.state.siteid,
            brand: this.state.brand,
            bank: this.state.bank,            
            install_date: this.state.install_date,
            protection: this.state.protection,            
            backup_time: this.state.backup_time
        }
        console.log(data)
        fetch("/api/modify_battery",  {
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
        this.props.history.push('/battery');
    }

    deleteBattery(battery) {
    console.log("battery: ", battery)
    var data = {
        site_id: battery.site_id
    }
    console.log("data: ", data)
    fetch("/api/delete_battery", {
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
    this.props.history.push('/battery');
    } 

      
  render() {
        return (
        <div className="container"> 
            <a href="/addbattery" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Battery</a> 

            <p></p>

            <div className="panel panel-default p50 uth-panel">
            
            <ReactTable
                    data={this.state.battery}
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
                            <button className="btn btn-danger" onClick={() => this.deleteBattery(row.original)}>Delete</button> 
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
                        Header: "Brand",
                        accessor: "brand"              
                    },
                    {
                        Header: "Bank",
                        accessor: "bank"
                    },
                    {
                        Header: "Install Date",
                        accessor: "install_date"
                    },
                    {
                        Header: "Protection",
                        accessor: "protection"              
                    },
                    {
                        Header: "Backup Time",
                        accessor: "backup_time"
                    }                    
                    ]}                    
                />

                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Edit Rectifier Modal" >
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
                                        <label>Brand</label>
                                            <input onChange={this.logChange} className="form-control" name='brand' value={this.state.brand}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Bank</label>
                                        <input onChange={this.logChange} className="form-control" name='bank' value={this.state.bank}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Install Date</label>
                                            <input onChange={this.logChange} className="form-control" name='install_date' value={this.state.install_date}/>
                                    </div>
                                </div>  
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Protection</label>
                                            <input onChange={this.logChange} className="form-control" name='protection' value={this.state.protection}/>
                                    </div>
                                </div>   
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Backup Time</label>
                                            <input onChange={this.logChange} className="form-control" name='backup_time' value={this.state.backup_time}/>
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
                <button type="button" class="btn btn-primary btn-sm">Download All Battery Data</button>}>
                <ExcelSheet data={this.state.battery} name="Battery">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="Brand" value="brand"/>
                <ExcelColumn label="Bank" value="bank"/>
                <ExcelColumn label="Install Date" value="install_date"/>
                <ExcelColumn label="Protection" value="protection"/>
                <ExcelColumn label="Backup Time" value="backup_time"/>
                </ExcelSheet>
            </ExcelFile>

            </div>
        </div>
      );
  }
}