import React from 'react';
//import { Redirect } from 'react-router'

export default class AddSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site_id:'',
            site_name:'',
            rtp:'',
            cluster:'',
            kecamatan:'',
            kabupaten:'',
            tower_prov:'',
            tower_type:'',
            tower_high:'',
            site_type:'',
            longitude:'',
            latitude:'',
            fireRedirect: false
        }
        this.logChange = this.logChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
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
        fetch("/api/add_site",  {
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
        this.props.history.push('/site');
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
        const { site_id, site_name, rtp, cluster, kecamatan, kabupaten, tower_prov, tower_type, tower_high, site_type, longitude, latitude} = this.state
        return (
        <div className="container addactivity-form">
            <div className="heading-section">
                <div className="main-heading">
                    Please insert your <span className="highlightme">site</span> here
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
                                        <label>Site Name</label>
                                        <input onChange={this.logChange} className="form-control" name='site_name' value={site_name}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>RTP</label>
                                        <input onChange={this.logChange} className="form-control" name='rtp' value={rtp}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Cluster</label>
                                        <input onChange={this.logChange} className="form-control" name='cluster' value={cluster}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Kecamatan</label>
                                        <input onChange={this.logChange} className="form-control" name='kecamatan' value={kecamatan}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Kabupaten</label>
                                        <input onChange={this.logChange} className="form-control" name='kabupaten' value={kabupaten}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Tower Provider</label>
                                        <input onChange={this.logChange} className="form-control" name='tower_prov' value={tower_prov}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Tower Type</label>
                                        <input onChange={this.logChange} className="form-control" name='tower_type' value={tower_type}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Tower High</label>
                                        <input onChange={this.logChange} className="form-control" name='tower_high' value={tower_high}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Site Type</label>
                                        <input onChange={this.logChange} className="form-control" name='site_type' value={site_type}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Longitude</label>
                                        <input onChange={this.logChange} className="form-control" name='longitude' value={longitude}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Latitude</label>
                                        <input onChange={this.logChange} className="form-control" name='latitude' value={latitude}/>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button class="btn btn-secondary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>  
                    {/*{fireRedirect && (<Redirect to={from || '/site'}/>)} */} 
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