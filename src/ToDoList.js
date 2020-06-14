// CONTAINS THE ToDoList COMPONENT

import React from 'react'

const ToDoList = (props) => {
    return (
        <div>
            <h3>{props.id} {props.name}</h3>
        </div>
    );
}

export default ToDoList;