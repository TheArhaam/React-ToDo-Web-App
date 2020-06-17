// CONTAINS THE ToDoList COMPONENT

import React from 'react'
import { Link } from "react-router-dom"

const ToDoList = (props) => {
    return (
        <div>
            <Link to={{ pathname: "/ToDoPage/" + props.id, listname: props.name }} property={props.id}>
                <div>
                    <h3>
                        {/* {props.id} */}
                        {props.name}
                    </h3>
                </div>
            </Link>
        </div>
    );
}

export default ToDoList;