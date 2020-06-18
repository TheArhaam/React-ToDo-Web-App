// CONTAINS THE ToDoPage COMPONENT

import React, { Component } from 'react'
import ToDo from './ToDo';
import axios from 'axios'
import './ToDoPage.css'

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
        await axios.get('/todos/', { params: { uid: uid, listid: this.props.location.state.listid } })
            .then((response) => {
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
            listid: this.props.location.state.listid,
            text: e.target.elements.ToDoText.value
        }

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.post('/todos/', newToDo)
            .then((response) => {
                alert(response.data)
                // window.location.reload();
                this.fetchToDos()
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {
        return (
            <div className="ToDoPageFULL">
                <p className="Marvel">MARVEL</p><p className="ToDoPageTitle">&nbsp;TO-DOS</p><br></br>
                <div className="ToDoFULL">
                    <h2>
                        {/* {this.props.location.state.listid} */}
                        {this.props.location.state.listname}
                    </h2>
                    {
                        this.state.todos.map((todo) => {
                            return (
                                <ToDo listid={this.props.match.params.listid} id={todo.id} text={todo.text} done={todo.done} />
                            );
                        })
                    }
                </div>
                {/* For adding new To-Do */}
                <form onSubmit={this.addNewToDo}>
                    <input type="text" name="ToDoText" id="ToDoText" placeholder="Enter new To-Do..." className="toDoInputField"/>
                    <button type="submit" className="newBttn">+ New To-Do</button>
                </form>
            </div>
        );
    }
}

export default ToDoPage;