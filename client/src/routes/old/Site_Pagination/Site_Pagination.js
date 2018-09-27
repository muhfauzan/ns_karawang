import React from 'react';
import Pagination from '../../components/Pagination';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Site_Pagination extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            sites: [],
            pageOfItems: []
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
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-bordered table-hover">
                    <thead class="thead-dark">                        
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
                            <th>Latitude</th>                          
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pageOfItems.map(member =>
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
                        <td>{member.latitude}</td>
                        <td>{member.longitude}</td>
                        </tr>
                    )}                    
                    </tbody>
                </table>
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
                <center>
                <Pagination items={this.state.sites} onChangePage={this.onChangePage} />
                </center>
            </div>
            </div>
      );
  }
}