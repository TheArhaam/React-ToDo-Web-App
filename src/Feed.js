// CONTAINS THE FEED 
// FEED CONSISTS OF TO-DO LISTS

import React, { Component } from 'react'
import ToDoList from './ToDoList'
import fireb from './FirebaseConfig'
import axios from 'axios'

class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todolists: []
        }
        this.addNewList = this.addNewList.bind(this);
        this.fetchToDoLists = this.fetchToDoLists.bind(this);
        this.fetchToDoLists();
    }

    // TO FETCH ALL TODOLISTS
    fetchToDoLists = async () => {
        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');

        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.get('/todolists/', { params: { uid: `${uid}` } })
            .then((response) => {
                this.setState({
                    todolists: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // TO ADD A NEW TODOLIST
    addNewList = async (e) => {
        e.preventDefault(); //PREVENTING BROWSER FROM REFRESHING THE PAGE AND LOSING DATA

        const authToken = localStorage.getItem('AuthToken');
        const uid = localStorage.getItem('userID');
        const newToDoList = {
            uid: uid,
            name: e.target.elements.ListName.value
        }
        axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };
        await axios.post('/todolists/', newToDoList)
            .then((response) => {
                alert(response.data)
                this.fetchToDoLists()
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <h1>TO-DO LIST</h1>
                {/* FOR SIGNING OUT */}
                <button onClick={() => { fireb.auth().signOut() }}>Sign Out</button>
                {/* TO DISPLAY THE todolists */}
                {
                    this.state.todolists.map((todolist) => {
                        return (
                            <ToDoList id={todolist.id} name={todolist.name} />
                        );
                    })
                }
                {/* For adding new To-Do List */}
                <form onSubmit={this.addNewList}>
                    <input type="text" name="ListName" id="ListName" placeholder="Enter new list name..." />
                    <button type="submit">New To-Do List</button>
                </form>
            </div>
        );
    }
}

export default Feed;