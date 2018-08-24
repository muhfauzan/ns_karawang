import React from 'react';
import Modal from 'react-modal';
import Pagination from '../../components/Pagination';
var dateFormat = require('dateformat');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Activity extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            acts: [],
            pageOfItems: [],
            modalIsOpen: false,
            id:'',
            siteid:'',
            category:'',
            activity:'',
            actdate:''
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
        this.openModal = this.openModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(act) {
        this.setState({
            modalIsOpen: true,
            id: act.id,
            siteid: act.site_id,
            category: act.category,
            activity: act.activity,
            act_date: act.act_date
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        event.preventDefault()
        this.setState({ fireRedirect: true })
        var data = {
            id:this.state.id,
            siteid: this.state.siteid,
            category: this.state.category,
            activity: this.state.activity,
            date: this.state.date 
        }
        console.log(data)
        fetch("/api/modact",  {
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

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
        let self = this;
        fetch('/api/acts', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({acts: data.response});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }

    deleteActivity(activity){
    console.log("activity: ", activity)
    var data = {
        id: activity.id
    }
    console.log("data: ", data)
    fetch("/api/delact", {
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
}

	render() {
        const { from } = this.props.location.state || '/'
        const { id, siteid, category, activity, actdate } = this.state
        return (
	      <div className="container"> 
            <a href="/newactivity" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add New Activity</a>
            <p></p>
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Site Id</th>
                            <th>Site Name</th>
                            <th>Category</th>
                            <th>Activity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.pageOfItems.map(act => 
                        <tr key={act.id}>
                            <td>{act.site_id} </td>
                            <td>{act.site_name} </td>
                            <td>{act.category}</td>
                            <td>{act.activity}</td>
                            <td>{dateFormat(act.act_date, "fullDate")}</td>    
                            <td><button className="btn btn-primary" onClick={() => this.openModal(act)}>Edit</button> <button className="btn btn-danger" onClick={() => this.deleteActivity(act)}>Delete</button></td>                 
                        </tr>
                    )}
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Edit Activity Modal" >
                                    <form onSubmit={this.handleEdit} method="POST">
                                        <div className="panel panel-default p50 uth-panel">
                                            <div className="panel-body uth-panel-body">
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Site Id</label>
                                                        <input onChange={this.logChange} className="form-control" name='siteid' value={this.state.siteid}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Category</label>
                                                        <input onChange={this.logChange} className="form-control" name='category' value={this.state.category}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Activity</label>
                                                        <input onChange={this.logChange} className="form-control" name='activity' value={this.state.activity}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-wrap">
                                                        <label>Date</label>
                                                        <input onChange={this.logChange} className="form-control" name='actdate' value={this.state.actdate}/>
                                                    </div>
                                                </div>
                                                <div className="submit-section">
                                                    <button className="btn btn-danger" onClick={this.closeModal}>Cancel</button> <button class="btn btn-secondary" >Submit</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </form>
                        </Modal>
                    </tbody>
                </table>
                <center>
                <Pagination items={this.state.acts} onChangePage={this.onChangePage} />
                </center>
            </div>
        </div>
    	);
	}
}