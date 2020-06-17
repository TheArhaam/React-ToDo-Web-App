// CONTAINS THE ToDoPage COMPONENT

import React, { Component } from 'react'
import ToDo from './ToDo';
import axios from 'axios'

class ToDoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.addNewToDo = this.addNewToDo.bind(this);
        this.fetchToDos = this.fetchToDos.bind(this);
        this.fetchToDos();
    }

    // TO FETCH ALL TODOS IN THE TODOLIST
    fetchToDos = async () => {

        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.get('/todos/', { params: { uid: uid, listid: this.props.match.params.listid } })    
            .then((response) => {
                console.log(response.data)
                this.setState({
                    todos: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // TO ADD A NEW TODO THE TODOLIST
    addNewToDo = async (e) => {
        e.preventDefault(); //PREVENTING BROWSER FROM REFRESHING THE PAGE AND LOSING DATA

        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');

        const newToDo = {
            uid: uid,
            listid: this.props.match.params.listid,
            text: e.target.elements.ToDoText.value
        }

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.post('/todos/', newToDo)
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

                <h2>{this.props.match.params.listid} {this.props.location.listname}</h2>
                {
                    this.state.todos.map((todo) => {
                        return (
                            <ToDo id={todo.id} text={todo.text} done={todo.done} />
                        );
                    })
                }
                {/* For adding new To-Do */}
                <form onSubmit={this.addNewToDo}>
                    <input type="text" name="ToDoText" id="ToDoText" placeholder="Enter new To-Do..." />
                    <button type="submit">New To-Do</button>
                </form>
            </div>
        );
    }
}

export default ToDoPage;