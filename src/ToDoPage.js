// CONTAINS THE ToDoPage COMPONENT

import React, { Component } from 'react'
import ToDo from './ToDo';

class ToDoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: 1, text: 'IS Assignment', done: false},
                { id: 2, text: 'WebSOA Assignment', done: true},
                { id: 3, text: 'Java Assignment', done: false},
                { id: 4, text: 'DS Assignment', done: false}
            ]
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.todos.map((todo) => {
                        return (
                            <ToDo id={todo.id} text={todo.text} done={todo.done} />
                        );
                    })
                }
            </div>
        );
    }
}

export default ToDoPage;