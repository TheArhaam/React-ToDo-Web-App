// CONTAINS THE ToDoPage COMPONENT

import React, { Component } from 'react'
import ToDo from './ToDo';

class ToDoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: 1, text: 'IS Assignment' },
                { id: 2, text: 'WebSOA Assignment' },
                { id: 3, text: 'Java Assignment' },
                { id: 4, text: 'DS Assignment' }
            ]
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.todos.map((todo) => {
                        return (
                            <ToDo id={todo.id} text={todo.text} />
                        );
                    })
                }
            </div>
        );
    }
}

export default ToDoPage;