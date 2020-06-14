// CONTAINS THE ToDoPage COMPONENT

import React, { Component } from 'react'
import ToDo from './ToDo';

class ToDoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: 1, text: 'IS Assignment', done: false },
                { id: 2, text: 'WebSOA Assignment', done: true },
                { id: 3, text: 'Java Assignment', done: false },
                { id: 4, text: 'DS Assignment', done: false }
            ]
        }
        this.addNewToDo = this.addNewToDo.bind(this)
    }

    addNewToDo = (e) => {
        e.preventDefault(); //PREVENTING BROWSER FROM REFRESHING THE PAGE AND LOSING DATA
        const toDoText  = e.target.elements.ToDoText.value;
        const oldList = this.state.todos;
        oldList.push({ id: oldList.length + 1, text: toDoText })
        this.setState({
            todolists: oldList
        });
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