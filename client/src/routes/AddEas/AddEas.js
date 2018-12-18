import React from 'react';
//import { Redirect } from 'react-router'

export default class AddEas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site_id:'',
            mains_fail:'',
            modulerecti_fail:'',
            battery_stolen:''
        }
        this.logChange = this.logChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
        var data = {
            site_id: this.state.site_id,            
            mains_fail: this.state.mains_fail,
            entity: this.state.entity,
            modulerecti_fail: this.state.modulerecti_fail,
            battery_stolen: this.state.battery_stolen
        }
        console.log(data)
        fetch("/api/add_eas",  {
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
        this.props.history.push('/eas');
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
        const { site_id, mains_fail, modulerecti_fail, battery_stolen } = this.state
        return (
        <div className="container addactivity-form">
            <div className="heading-section">
                <div className="main-heading">  
                    Please insert your <span className="highlightme">EAS</span> here
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
                                        <label>Mains Fail</label>
                                        <input onChange={this.logChange} className="form-control" name='mains_fail' value={mains_fail}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Module Recti Fail</label>
                                        <input onChange={this.logChange} className="form-control" name='modulerecti_fail' value={modulerecti_fail}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Battery Stollen</label>
                                        <input onChange={this.logChange} className="form-control" name='battery_stolen' value={battery_stolen}/>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button class="btn btn-secondary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>  
                    {/*{fireRedirect && (<Redirect to={from || '/eas'}/>)} */} 
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