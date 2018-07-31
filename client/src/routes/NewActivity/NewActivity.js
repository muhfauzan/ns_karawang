import React from 'react';

export default class NewActivity extends React.Component {
	render() {
		return (
            <div className="container register-form">
			<div className="container register-form">
                <div className="heading-section">
                    <div className="main-heading">
                        Please input your <span className="highlightme">activity</span> here
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                        <div className="panel panel-default p50 uth-panel">
                            <div className="panel-body uth-panel-body">
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Name</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Age</label>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Email</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>City</label>                                        
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Blood Group</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Date of birth</label></div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Password</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Password Confirm</label>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button type="button" class="btn btn-uth-submit">Submit</button>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default p25 uth-panel">
                        <div className="uth-panel-head">Tambah-tambah</div>
                        <div className="panel-body uth-panel-body">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
		)
	}
}