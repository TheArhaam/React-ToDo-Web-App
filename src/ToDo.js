// CONTAINS THE IMPLEMENTATION ToDo COMPONENT

import React from 'react'

const ToDo = (props) => {
    return(
        <div>
            {props.id} {props.text}
        </div>
    );
}

export default ToDo;