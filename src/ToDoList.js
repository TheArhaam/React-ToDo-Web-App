// CONTAINS THE ToDoList COMPONENT

import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

const ToDoList = (props) => {

    const handleDelete = async (e) => {
        console.log('handleDelete');
        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');
        const delList = {
            uid: uid,
            id: props.id
        }
        console.log('delList uid: ' + delList.uid);
        console.log('delList id: ' + delList.id);

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.delete('/todolists', { data: delList })
            .then((response) => {
                alert(response.data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <div>
                <center>
                    <table>
                        <tr>
                            <td>
                                <Link to={{ pathname: "/ToDoPage/" + props.id, listname: props.name }} property={props.id}>
                                    <div>
                                        <h3>
                                            {props.name}
                                        </h3>
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <button name="deleteBttn" onClick={handleDelete}>Delete</button>
                            </td>
                            <td>
                                <button name="editBttn">Edit</button>
                            </td>
                        </tr>
                    </table>
                </center>

            </div>
        </div>
    );
}

export default ToDoList;