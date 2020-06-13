// CONTAINS THE LOGIN COMPONENT

import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from "react-router"
import { Link } from "react-router-dom"
import fireb from './FirebaseConfig'
import { AuthContext } from "./Auth.js"
import './App.css'


const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await fireb
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <div className="Login">
            <p style={{ "font-size": "30px", "fontWeight": "bolder" }}>LOGIN</p>
            <form onSubmit={handleLogin}>
                <table>
                    <tr>
                        <td>Email:</td>
                        <td><input type="text" name="email" /></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="password" name="password" /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{ "text-align": "center" }}><input type="submit" value="LOGIN" /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{ "text-align": "center" }}>New User? <Link to="/Register">Register now.</Link> </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}
export default withRouter(Login);