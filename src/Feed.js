// CONTAINS THE FEED 
// FEED CONSISTS OF TO-DO LISTS

import React, { Component } from 'react'
import { Link } from "react-router-dom"
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
    }

    render() {
        return (
            <div>
                {/* <h1>TO-DO WEB APPLICATION</h1> */}
                <button onClick={() => { fireb.auth().signOut() }}>Sign Out</button>
                {
                    this.state.todolists.map((todolist) => {
                        return (
                            <Link to='/ToDoPage'>
                                <div >
                                    <ToDoList id={todolist.id} name={todolist.name} />
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

export default Feed;