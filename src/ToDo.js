// CONTAINS THE IMPLEMENTATION ToDo COMPONENT

import React, { Component } from 'react'
import axios from 'axios'

class ToDo extends Component {

    constructor(props) {
        super(props);
        console.log(`DONE ${props.text}: `+props.done)
        this.state = {
            doneStyle: (props.done=='true') ? { 'text-decoration': 'line-through' } : {},
            checkedVal: (props.done=='true') ? true : false,
        }
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange = async (e) => {
        if (this.state.checkedVal === true) {
            this.setState({
                doneStyle: {},
                checkedVal: !this.state.checkedVal
            });
        }
        else {
            this.setState({
                doneStyle: { 'text-decoration': 'line-through' },
                checkedVal: !this.state.checkedVal
            });
        }

        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');

        const toDo = {
            uid: uid,
            listid: this.props.listid,
            todoid: this.props.id,
            done: `${!this.state.checkedVal}`
        }

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.post('/todos/done', toDo)
            .then((response) => {
                alert(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <input type="checkbox" defaultChecked={this.state.checkedVal} id={this.props.id} name={this.props.id} onChange={this.handleCheckChange} />
                <label htmlFor={this.props.id}>
                    <div style={this.state.doneStyle}>
                        {/* {this.props.id}  */}
                        {this.props.text}
                    </div>
                </label>
            </div>
        );
    }
}
export default ToDo;