import React, { Component } from 'react'
import './App.css'
import Login from './Login';
import Register from './Register'
import Feed from './Feed'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import ToDoPage from './ToDoPage';

// TO-DO:
// -CONVERT ToDoList & ToDo TO CLASS COMPONENTS
// -IMPLEMENT EDIT

class App extends Component {
  render() {
    return (
      // FOR AUTHENTICATION DETAILS
      <AuthProvider>
        {/* Using Router to navigate between the different components */}
        <Router>
          <div className="App">
            <PrivateRoute exact path='/' component={Feed} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Register' component={Register} />
            <Route exact path='/ToDoPage/:listid' component={ToDoPage} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
