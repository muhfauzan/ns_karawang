import React from 'react';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import Modal from 'react-modal';
import "react-table/react-table.css";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Rectifier extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            rectifier: [],
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);        
    }

    openModal(act) {
        this.setState({
            modalIsOpen: true,
            siteid: act.site_id,
            brand: act.brand,
            entity: act.entity,
            capacity: act.capacity,
            current_load: act.current_load
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

    componentDidMount() {
        let self = this;
        fetch('/api/rectifier', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({rectifier: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    handleEdit(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
        var data = {
            site_id: this.state.siteid,
            brand: this.state.brand,
            entity: this.state.entity,
            capacity: this.state.capacity,            
            current_load: this.state.current_load
        }
        console.log(data)
        fetch("/api/modify_rectifier",  {
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
        this.props.history.push('/rectifier');
    }

    deleteRectifier(site){
    console.log("site: ", site)
    var data = {
        site_id: site.site_id
    }
    console.log("data: ", data)
    fetch("/api/delete_rectifier", {
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
    this.props.history.push('/rectifier');
    }  

    render() {
        return (            
        <div className="container"> 
            <a href="/addrectifier" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Rectifier</a> 

            <p></p>

            <div className="panel panel-default p50 uth-panel">
            
            <ReactTable
                    data={this.state.rectifier}
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
                        Header: "Entity",
                        accessor: "entity"
                    },
                    {
                        Header: "Capacity",
                        accessor: "capacity"
                    },
                    {
                        Header: "Current Load",
                        accessor: "current_load"              
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
                            <button className="btn btn-danger" onClick={() => this.deleteRectifier(row.original)}>Delete</button> 
                        )
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
                                        <label>Entity</label>
                                        <input onChange={this.logChange} className="form-control" name='entity' value={this.state.entity}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Capacity</label>
                                            <input onChange={this.logChange} className="form-control" name='capacity' value={this.state.capacity}/>
                                    </div>
                                </div>  
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Current Load</label>
                                            <input onChange={this.logChange} className="form-control" name='current_load' value={this.state.current_load}/>
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
                <button type="button" class="btn btn-primary btn-sm">Download All Rectifier Data</button>}>
                <ExcelSheet data={this.state.rectifier} name="Rectifier">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="Brand" value="brand"/>
                <ExcelColumn label="Entity" value="entity"/>
                <ExcelColumn label="Capacity" value="capacity"/>
                <ExcelColumn label="Current Load" value="current_load"/>
                </ExcelSheet>
            </ExcelFile>

            </div>
        </div>
      );
  }
}