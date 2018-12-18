import React from 'react';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-modal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Genset extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            genset: [],
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this); 
    }

    componentDidMount() {
        let self = this;
        fetch('/api/genset', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({genset: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }   

    openModal(transport) {
        this.setState({
            modalIsOpen: true,
            siteid: transport.site_id,
            brand: transport.brand,
            power_capacity: transport.power_capacity,
            fuel_capacity: transport.fuel_capacity
        });
        console.log(transport)
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
            power_capacity: this.state.power_capacity,            
            fuel_capacity: this.state.fuel_capacity
        }
        console.log(data)
        fetch("/api/modify_genset",  {
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
        this.props.history.push('/genset');
    }

    deleteGenset(genset) {
    console.log("genset: ", genset)
    var data = {
        site_id: genset.site_id
    }
    console.log("data: ", data)
    fetch("/api/delete_genset", {
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
    this.props.history.push('/genset');
    }  
      
  render() {
        return (
            
        <div className="container">        
            <a href="/addgenset" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Genset</a> 

            <p></p>                 
            <div className="panel panel-default p50 uth-panel">
            
            <ReactTable
                    data={this.state.genset}
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
                        Header: "Brand",
                        accessor: "brand"              
                    },
                    {
                        Header: "Power Capacity",
                        accessor: "power_capacity"
                    },
                    {
                        Header: "Fuel Capacity",
                        accessor: "fuel_capacity"
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
                            <button className="btn btn-danger" onClick={() => this.deleteGenset(row.original)}>Delete</button> 
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
                                        <label>Brand</label>
                                            <input onChange={this.logChange} className="form-control" name='brand' value={this.state.brand}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Power Capacity</label>
                                        <input onChange={this.logChange} className="form-control" name='power_capacity' value={this.state.power_capacity}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Fuel Capacity</label>
                                            <input onChange={this.logChange} className="form-control" name='fuel_capacity' value={this.state.fuel_capacity}/>
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
                <button type="button" class="btn btn-primary btn-sm">Download All Genset Data</button>}>
                <ExcelSheet data={this.state.genset} name="Genset">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="Brand" value="brand"/>
                <ExcelColumn label="Power Capacity" value="power_capacity"/>
                <ExcelColumn label="Fuel Capacity" value="fuel_capacity"/>
                </ExcelSheet>
            </ExcelFile>

            </div>
        </div>
      );
  }
}