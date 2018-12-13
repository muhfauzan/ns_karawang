import React from 'react';
//import { Redirect } from 'react-router'

export default class AddBattery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site_id:'',
            brand:'',
            bank:'',
            install_date:'',
            protection:'',
            backup_time:'',
            fireRedirect: false
        }
        this.logChange = this.logChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
        var data = {
            site_id: this.state.site_id,            
            brand: this.state.brand,
            bank: this.state.bank,
            install_date: this.state.install_date,
            protection: this.state.protection, 
            backup_time: this.state.backup_time, 
        }
        console.log(data)
        fetch("/api/add_battery",  {
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

    logChange(e) {
        console.log("logChange: ", e)
        if(e.target){
            if(e.target.name){
                this.setState({[e.target.name]: e.target.value});  
            }
        } 
    }
    
    render() {
        //const { from } = this.props.location.state || '/'
        //const { fireRedirect } = this.state
        const { site_id, brand, bank, install_date, protection, backup_time } = this.state
        return (
        <div className="container addactivity-form">
            <div className="heading-section">
                <div className="main-heading">  
                    Please insert your <span className="highlightme">battery</span> here
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={this.handleSubmit} method="POST">
                        <div className="panel panel-default p50 uth-panel">
                            <div className="panel-body uth-panel-body">
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Site Id</label>
                                        <input onChange={this.logChange} className="form-control" name='site_id' value={site_id}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Brand</label>
                                        <input onChange={this.logChange} className="form-control" name='brand' value={brand}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Bank</label>
                                        <input onChange={this.logChange} className="form-control" name='bank' value={bank}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Install Date</label>
                                        <input onChange={this.logChange} className="form-control" name='install_date' value={install_date}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Protection</label>
                                        <input onChange={this.logChange} className="form-control" name='protection' value={protection}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Backup Time</label>
                                        <input onChange={this.logChange} className="form-control" name='backup_time' value={backup_time}/>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button class="btn btn-secondary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>  
                    {/*{fireRedirect && (<Redirect to={from || '/activity'}/>)} */} 
                </div>
                {/*
                <div className="col-md-4">
                    <div className="panel panel-default p25 uth-panel">
                        <div className="uth-panel-head">Tambah-tambah</div>
                        <div className="panel-body uth-panel-body"></div>
                    </div>
                </div>
                */}
            </div>
        </div>
        );
    }
}