import React from 'react';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Site_Download extends React.Component {
	constructor(props) {
		super([props)
		this.state = {
			sites: []
		};
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
			<ExcelFile element={<button> Download All Data</button>}>
				<ExcelSheet data={this.state.sites} name="Sheets">
					<ExcelColumn label="Site Id" value="sites.site_id"

				</ExcelSheet>
			</ExcelFile>
			)
	}
}