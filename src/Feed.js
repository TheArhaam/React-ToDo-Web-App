// CONTAINS THE FEED 
// FEED CONSISTS OF TO-DO LISTS

import React, { Component } from 'react'
import ToDoList from './ToDoList'
import fireb from './FirebaseConfig'
import axios from 'axios'
// import { response } from 'express';

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

    addNewList = (e) => {
        e.preventDefault(); //PREVENTING BROWSER FROM REFRESHING THE PAGE AND LOSING DATA

        // const listName = e.target.elements.ListName.value;
        // const oldList = this.state.todolists;
        // oldList.push({ id: oldList.length + 1, name: listName })

        this.setState({
            todolists: oldList
        });
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