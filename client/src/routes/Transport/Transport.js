import React from 'react';
//import Pagination from '../../components/Pagination';
import ReactExport from 'react-data-export';
import ReactTable from "react-table";
import "react-table/react-table.css";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Transport extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            transport: []
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

      
  render() {
        return (
            
        <div className="container">                         
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
                            <button className="btn btn-primary">Edit</button>                             
                        )
                    },
                    {
                        filterable: false,
                        width: 100,
                        Cell: row => (
                            <button className="btn btn-danger">Delete</button> 
                        )
                    }
                    ]}                    
                />

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