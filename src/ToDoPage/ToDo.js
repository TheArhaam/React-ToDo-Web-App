// CONTAINS THE IMPLEMENTATION ToDo COMPONENT

import React, { Component } from 'react'
import axios from 'axios'
import './ToDo.css'

class ToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            doneStyle: (props.done === 'true') ? { 'text-decoration': 'line-through' } : {},
            checkedVal: (props.done === 'true') ? true : false,
            editDisabled: true
        }
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    // TO UPDATE THE DONE VALUE OF TODO
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

    // TO UPDATE STATE TEXT WHEN TODO IS EDITED
    handleTextChange = async (e) => {
        this.setState({
            text: e.target.value
        })
    }

    // TO CHANGE THE EDIT STATE
    handleEdit = async (e) => {
        if (this.state.editDisabled) {
            this.setState({
                editDisabled: false
            });
        }
        else if (!this.state.editDisabled) {
            this.setState({
                editDisabled: true
            })

            const authToken = localStorage.getItem('AuthToken');
            const uid = localStorage.getItem('userID');

            const toDo = {
                uid: uid,
                listid: this.props.listid,
                todoid: this.props.id,
                text: this.state.text
            }

            axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
            await axios.post('/todos/edit', toDo)
                .then((response) => {
                    alert(response.data)
                    // window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    // TO DELETE TODO
    handleDelete = async () => {
        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');

        const toDo = {
            uid: uid,
            listid: this.props.listid,
            todoid: this.props.id
        }

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.delete('/todos', { data: toDo })
            .then((response) => {
                alert(response.data)
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <div style={this.state.doneStyle}>
                    <center>
                        <table className="ToDoTable">
                            <tr>
                                <td className="ToDoTable tdcheck">
                                    <input className="doneCheck" type="checkbox" defaultChecked={this.state.checkedVal} id={this.props.id} name={this.props.id} onChange={this.handleCheckChange} />
                                    <span className="checkmark"></span>
                                </td>
                                <label htmlFor={this.props.id} >
                                    <td className="ToDoTable tdtext">
                                        <textarea type="text" className="toDoEditField" value={this.state.text} disabled={this.state.editDisabled} onChange={this.handleTextChange} style={this.state.doneStyle}/>

                                    </td>
                                </label>
                                <td className="ToDoTable td">
                                    <button onClick={this.handleDelete} className="toDoBttn"><i class="material-icons" style={{ "font-size": "20px", "color": "rgb(156, 156, 3)" }}>delete</i></button>
                                </td>
                                <td className="ToDoTable td">
                                    <button onClick={this.handleEdit} className="toDoBttn"><i class="material-icons" style={{ "font-size": "20px", "color": "rgb(156, 156, 3)" }}>mode_edit</i></button>
                                </td>
                            </tr>
                        </table>
                    </center>
                </div>
            </div>
        );
    }
}
export default ToDo;