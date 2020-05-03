import React, { Component } from 'react'

class Search extends Component {
    constructor() {
        super();
        this.state = {
            practitionerId: ''
        };
        this.updatePractitionerId = this.updatePractitionerId.bind(this)
    }

    updatePractitionerId(e) {
        this.setState({
            practitionerId: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.practitionerId)
    }



    render() { 
        return <div>
            <h1>Hello {this.state.practitionerId}</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Practitioner ID:
                    <input type="text" value={this.state.practitionerId} required onChange={this.updatePractitionerId}/>
                    <input type="submit" value = "Search"/>
                </label>
            </form>
        </div>
        

    }
}

export default Search