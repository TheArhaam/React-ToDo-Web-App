// CONTAINS THE FEED 
// FEED CONSISTS OF TO-DO LISTS

import React from 'react'
import fireb from './FirebaseConfig'

const Feed = () => {
    return (
        <div>
            <h1>TO-DO WEB APPLICATION</h1>
            <button onClick={() => { fireb.auth().signOut() }}>Sign Out</button>
        </div>
    );
}

export default Feed;