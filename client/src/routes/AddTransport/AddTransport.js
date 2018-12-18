import React from 'react';
//import { Redirect } from 'react-router'

export default class AddTransport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site_id:'',
            mac_add:'',
            transport_type:'',
            far_end:'',
            metro:'',
            port_metro:'',
            service:'',
            clock:'',
            oam:'',
            gsm:'',
            cplane:'',
            uplane:'',
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
        fetch("/api/add_transport",  {
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
        const { site_id, mac_add, transport_type, far_end, metro, port_metro, service, clock, oam, gsm, cplane, uplane } = this.state
        return (
        <div className="container addactivity-form">
            <div className="heading-section">
                <div className="main-heading">  
                    Please insert your <span className="highlightme">transport</span> here
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
                                        <label>Mac Address</label>
                                        <input onChange={this.logChange} className="form-control" name='mac_add' value={mac_add}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Transport Type</label>
                                        <input onChange={this.logChange} className="form-control" name='transport_type' value={transport_type}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Far End</label>
                                        <input onChange={this.logChange} className="form-control" name='far_end' value={far_end}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Metro</label>
                                        <input onChange={this.logChange} className="form-control" name='metro' value={metro}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Port Metro</label>
                                        <input onChange={this.logChange} className="form-control" name='port_metro' value={port_metro}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN Service</label>
                                        <input onChange={this.logChange} className="form-control" name='service' value={service}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN Clock</label>
                                        <input onChange={this.logChange} className="form-control" name='clock' value={clock}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN OAM</label>
                                        <input onChange={this.logChange} className="form-control" name='oam' value={oam}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN 2G</label>
                                        <input onChange={this.logChange} className="form-control" name='gsm' value={gsm}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN C Plane</label>
                                        <input onChange={this.logChange} className="form-control" name='cplane' value={cplane}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>VLAN C Plane</label>
                                        <input onChange={this.logChange} className="form-control" name='uplane' value={uplane}/>
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