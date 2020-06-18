// CONTAINS THE ToDoList COMPONENT

import React from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import './ToDoList.css'

const ToDoList = (props) => {

    // TO DELETE TODOLIST
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
        <div className="ToDoListFULL">
            <div className="ToDoListIN">
                <center>
                    <table className="ToDoListTable">
                        <tr>
                            <td className="ToDoListTable tdname">
                                <Link to={{ pathname: "/ToDoPage/" + props.id, state: { listid: props.id, listname: props.name } }} className="listName">
                                    <div>
                                        <h3 className="listName">
                                            {props.name}
                                        </h3>
                                    </div>
                                </Link>
                            </td>
                            <td className="ToDoListTable td">
                                <button name="deleteBttn" onClick={handleDelete} class="toDoListBttn"><i class="material-icons" style={{ "font-size": "20px", "color": "rgb(156, 156, 3)" }}>delete</i></button>
                            </td>
                            {/* <td className="ToDoListTable td">
                                <button name="editBttn" className="toDoListBttn"><i class="material-icons" style={{ "font-size": "20px", "color": "rgb(156, 156, 3)" }}>mode_edit</i></button>
                            </td> */}
                        </tr>
                    </table>
                </center>

            </div>
        </div>
    );
}

export default ToDoList;