import React, { Component } from 'react'
import './App.css'
import Login from './Login/Login';
import Register from './Register/Register'
import Feed from './ToDoListPage/Feed'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import ToDoPage from './ToDoPage/ToDoPage';


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
