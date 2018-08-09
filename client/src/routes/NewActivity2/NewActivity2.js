import React from 'react';

export default class NewActivity2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteid:'',
            category:'',
            activity:'',
            actdate:''
        }
        this.logChange = this.logChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            siteid: this.state.siteid,
            category: this.state.category,
            activity: this.state.activity,
            date: this.state.date 
        }
        console.log(data)
        fetch("/api/addact",  {
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
        const { siteid, category, activity, actdate } = this.state
        return (
        <div className="container register-form">
            <div className="heading-section">
                <div className="main-heading">
                    Please insert your <span className="highlightme">activity</span> here
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
                                        <input onChange={this.logChange} className="form-control" name='siteid' value={siteid}/>                            
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Category</label>
                                        <input onChange={this.logChange} className="form-control" name='category' value={category}/>
                                    </div>
                                </div>
                                 <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Activity</label>
                                        <input onChange={this.logChange} className="form-control" name='activity' value={activity}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-wrap">
                                        <label>Date</label>
                                        <input onChange={this.logChange} className="form-control" name='actdate' value={actdate}/>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button class="btn btn-secondary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>    
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default p25 uth-panel">
                        <div className="uth-panel-head">Tambah-tambah</div>
                        <div className="panel-body uth-panel-body"></div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}