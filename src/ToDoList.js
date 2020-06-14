// CONTAINS THE ToDoList COMPONENT

import React from 'react'

const ToDoList = (props) => {
    return (
        <div>
            <h1>TO-DO LISTS</h1>
            <h3>{props.id} {props.name}</h3>
        </div>
    );
}

export default ToDoList;