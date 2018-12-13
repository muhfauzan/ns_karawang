import React from 'react';
//import Pagination from '../../components/Pagination';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-modal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Site extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            sites: [],
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        //this.onChangePage = this.onChangePage.bind(this);
        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    /*
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    */
    componentDidMount() {
        let self = this;
        fetch('/api/site', {
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

    deleteSite(site){
    console.log("site: ", site)
    var data = {
        site_id: site.site_id
    }
    console.log("data: ", data)
    fetch("/api/delete_site", {
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
    this.props.history.push('/site');
    }

    handleEdit(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
        var data = {
            site_id:this.state.site_id, 
            site_name:this.state.site_name,
            rtp:this.state.rtp,
            cluster:this.state.cluster,
            kecamatan:this.state.kecamatan,
            kabupaten:this.state.kabupaten,
            tower_prov:this.state.tower_prov,
            tower_type:this.state.tower_type,
            tower_high:this.state.tower_high,
            site_type:this.state.site_type,
            longitude:this.state.longitude,
            latitude:this.state.latitude,
        }
        console.log(data)
        fetch("/api/modify_site",  {
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

    openModal(site) {
        this.setState({
            modalIsOpen: true,
            site_id: site.site_id,
            site_name: site.site_name,
            rtp:site.rtp,
            cluster:site.cluster,
            kecamatan:site.kecamatan,
            kabupaten:site.kabupaten,
            tower_prov:site.tower_prov,
            tower_type:site.tower_type,
            tower_high:site.tower_high,
            site_type:site.site_type,
            longitude:site.longitude,
            latitude:site.latitude
        });
        console.log(site)
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }
      
  render() {
        return (    
        <div className="container">    
            <a href="/addsite" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Site</a> 

            <p></p>

            <div className="panel panel-default p50 uth-panel">
            
            <ReactTable
                    data={this.state.sites}
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
                        Header: "RTP",
                        accessor: "rtp"              
                    },
                    {
                        Header: "Cluster",
                        accessor: "cluster"
                    },
                    {
                        Header: "Kecamatan",
                        accessor: "kecamatan"
                    },
                    {
                        Header: "Kabupaten",
                        accessor: "kabupaten"              
                    },
                    {
                        Header: "TP",
                        accessor: "tower_prov"
                    },
                    {
                        Header: "Tower Type",
                        accessor: "tower_type"              
                    },
                    {
                        Header: "Tower Hight",
                        accessor: "tower_high"
                    },
                    {
                        Header: "Site Type",
                        accessor: "site_type"
                    },
                    {
                        Header: "Latitude",
                        accessor: "latitude"
                    },
                    {
                        Header: "Longitude",
                        accessor: "longitude"
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
                            <button className="btn btn-danger" onClick={() => this.deleteSite(row.original)}>Delete</button> 
                        )
                    }
                    ]}                    
                />
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Edit Site Modal" >
                    <form onSubmit={this.handleEdit} method="POST">
                        <div className="panel panel-default p50 uth-panel">
                            <div className="panel-body uth-panel-body">
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Site Id</label>
                                        <input onChange={this.logChange} className="form-control" name='site_id' value={this.state.site_id}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Site Name</label>
                                        <input onChange={this.logChange} className="form-control" name='site_name' value={this.state.site_name}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>RTP</label>
                                        <input onChange={this.logChange} className="form-control" name='rtp' value={this.state.rtp}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Cluster</label>
                                        <input onChange={this.logChange} className="form-control" name='cluster' value={this.state.cluster}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Kecamatan</label>
                                        <input onChange={this.logChange} className="form-control" name='kecamatan' value={this.state.kecamatan}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Kabupaten</label>
                                        <input onChange={this.logChange} className="form-control" name='kabupaten' value={this.state.kabupaten}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>TP</label>
                                        <input onChange={this.logChange} className="form-control" name='tower_prov' value={this.state.tower_prov}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Tower Type</label>
                                        <input onChange={this.logChange} className="form-control" name='tower_type' value={this.state.tower_type}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Tower High</label>
                                        <input onChange={this.logChange} className="form-control" name='tower_high' value={this.state.tower_high}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Site Type</label>
                                        <input onChange={this.logChange} className="form-control" name='site_type' value={this.state.site_type}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Latitude</label>
                                        <input onChange={this.logChange} className="form-control" name='latitude' value={this.state.latitude}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Latitude</label>
                                        <input onChange={this.logChange} className="form-control" name='longitude' value={this.state.longitude}/>
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
                <button type="button" class="btn btn-primary btn-sm">Download All Data</button>}>
                <ExcelSheet data={this.state.sites} name="Sheets">
                <ExcelColumn label="Site Id" value="site_id"/>
                <ExcelColumn label="Site Name" value="site_name"/>
                <ExcelColumn label="RTP" value="rtp"/>
                <ExcelColumn label="Cluster" value="cluster"/>
                <ExcelColumn label="Kecamatan" value="kecamatan"/>
                <ExcelColumn label="Kabupaten" value="kabupaten"/>
                <ExcelColumn label="TP" value="tower_prov"/>
                <ExcelColumn label="Tower Type" value="tower_type"/>
                <ExcelColumn label="Tower Height" value="tower_high"/>
                <ExcelColumn label="Site Type" value="site_type"/> 
                <ExcelColumn label="Latitude" value="latitude"/> 
                <ExcelColumn label="Longitude" value="longitude"/>
                </ExcelSheet>
            </ExcelFile>

            </div>
        </div>
      );
  }
}