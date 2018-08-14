deleteMember(member){
    var data = {
        id: member.id
    }
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
        if(data === "success"){
           this.setState({msg: "User has been deleted."});  
        }
    }).catch(function(err) {
        console.log(err)
    });
}