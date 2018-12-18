import React from 'react';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-modal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Transport extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            transport: [],
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this); 
    }

    componentDidMount() {
        let self = this;
        fetch('/api/transport', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({transport: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }  

    openModal(transport) {
        this.setState({
            modalIsOpen: true,
            siteid: transport.site_id,
            mac_add: transport.mac_add,
            transport_type: transport.transport_type,
            far_end: transport.far_end,
            metro: transport.metro,
            port_metro: transport.port_metro,
            service: transport.service,
            clock: transport.clock,
            oam: transport.oam,
            gsm: transport.gsm,
            cplane: transport.cplane,
            uplane: transport.uplane
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
            mac_add: this.state.mac_add,
            transport_type: this.state.transport_type,            
            far_end: this.state.far_end,
            metro: this.state.metro,            
            port_metro: this.state.port_metro,
            service: this.state.service,
            clock: this.state.clock,
            oam: this.state.oam,            
            gsm: this.state.gsm,
            cplane: this.state.cplane,            
            uplane: this.state.uplane
        }
        console.log(data)
        fetch("/api/modify_transport",  {
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
        this.props.history.push('/transport');
    }

    deleteTransport(transport) {
    console.log("transport: ", transport)
    var data = {
        site_id: transport.site_id
    }
    console.log("data: ", data)
    fetch("/api/delete_transport", {
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
    this.props.history.push('/transport');
    }  

      
  render() {
        return (
            
        <div className="container">          
            <a href="/addtransport" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Transport</a> 

            <p></p>               
            <div className="panel panel-default p50 uth-panel">
            
            <ReactTable
                    data={this.state.transport}
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
                        Header: "Mac Address",
                        accessor: "mac_add"              
                    },
                    {
                        Header: "Transport Type",
                        accessor: "transport_type"
                    },
                    {
                        Header: "Far End",
                        accessor: "far_end"
                    },
                    {
                        Header: "Metro",
                        accessor: "metro"
                    },
                    {
                        Header: "Port Metro",
                        accessor: "port_metro"              
                    },
                    {
                        Header: "Service",
                        accessor: "service"
                    },
                    {
                        Header: "Clock",
                        accessor: "clock"
                    },
                    {
                        Header: "OAM",
                        accessor: "oam"
                    },
                    {
                        Header: "2G",
                        accessor: "2g"              
                    },
                    {
                        Header: "C Plane",
                        accessor: "cplane"
                    },
                    {
                        Header: "U Plane",
                        accessor: "uplane"
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
                            <button className="btn btn-danger" onClick={() => this.deleteTransport(row.original)}>Delete</button> 
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
                                        <label>Mac Address</label>
                                            <input onChange={this.logChange} className="form-control" name='mac_add' value={this.state.mac_add}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Transport Type</label>
                                        <input onChange={this.logChange} className="form-control" name='transport_type' value={this.state.transport_type}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Far End</label>
                                        <input onChange={this.logChange} className="form-control" name='far_end' value={this.state.far_end}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Metro</label>
                                        <input onChange={this.logChange} className="form-control" name='metro' value={this.state.metro}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Port Metro</label>
                                        <input onChange={this.logChange} className="form-control" name='protection' value={this.state.port_metro}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN Service</label>
                                        <input onChange={this.logChange} className="form-control" name='service' value={this.state.service}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN Clock</label>
                                        <input onChange={this.logChange} className="form-control" name='clock' value={this.state.clock}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN OAM</label>
                                        <input onChange={this.logChange} className="form-control" name='oam' value={this.state.oam}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN 2G</label>
                                        <input onChange={this.logChange} className="form-control" name='gsm' value={this.state.gsm}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN C Plane</label>
                                        <input onChange={this.logChange} className="form-control" name='cplane' value={this.state.cplane}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN C Plane</label>
                                        <input onChange={this.logChange} className="form-control" name='uplane' value={this.state.uplane}/>
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
                <button type="button" class="btn btn-primary btn-sm">Download All Transport Data</button>}>
                <ExcelSheet data={this.state.transport} name="Transport">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="Mac Address" value="mac_add"/>
                <ExcelColumn label="Transport Type" value="transport_type"/>
                <ExcelColumn label="Far End" value="far_end"/>
                <ExcelColumn label="Metro" value="metro"/>
                <ExcelColumn label="Port Metro" value="port_metro"/>
                <ExcelColumn label="Service" value="service"/>
                <ExcelColumn label="Clock" value="clock"/> 
                <ExcelColumn label="OAM" value="oam"/> 
                <ExcelColumn label="2G" value="gsm"/>
                <ExcelColumn label="Control Plane" value="cplane"/> 
                <ExcelColumn label="User Plane" value="uplane"/>
                </ExcelSheet>
            </ExcelFile>

            </div>
        </div>
      );
  }
}