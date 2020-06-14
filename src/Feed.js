// CONTAINS THE FEED 
// FEED CONSISTS OF TO-DO LISTS

import React, { Component } from 'react'
import ToDoList from './ToDoList'
import fireb from './FirebaseConfig'


class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todolists: [
                { id: 1, name: 'College Work' },
                { id: 2, name: 'Household Work' },
                { id: 3, name: 'Miscellaneous' },
            ]
        }
        this.addNewList = this.addNewList.bind(this);
    }

    addNewList = (e) => {
        e.preventDefault(); //PREVENTING BROWSER FROM REFRESHING THE PAGE AND LOSING DATA
        const listName  = e.target.elements.ListName.value;
        const oldList = this.state.todolists;
        oldList.push({ id: oldList.length + 1, name: listName })
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