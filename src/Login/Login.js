// CONTAINS THE LOGIN COMPONENT

import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from "react-router"
import { Link } from "react-router-dom"
import fireb from '../FirebaseConfig'
import { AuthContext } from "../Auth.js"
import axios from 'axios'
import './Login.css'
import '../App.css'


const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            const user = {
                email: email.value,
                pass: password.value
            }
            try {

                // LOGGING IN
                await axios.post('/user/existing', user)
                    .then(async (response) => {
                        console.log(response);
                        localStorage.setItem('AuthToken', response.data.token);
                        localStorage.setItem('userID', response.data.uid)
                        // LOGGING IN TO UPDATE currentUser
                        await fireb
                            .auth()
                            .signInWithEmailAndPassword(email.value, password.value);
                        history.push("/");
                    })

            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        console.log(currentUser);
        return <Redirect to="/" />;
    }
    return (
        <div className="LoginFULL">
            <p className="Marvel">MARVEL</p><p className="Title">&nbsp;TO-DO</p><br></br>
            <div className="Login">
                <p className="LogTitle">LOGIN</p>
                <form onSubmit={handleLogin}>
                    <table>
                        <tr>
                            <td>Email:</td>
                            <td><input type="text" name="email" className="inputField"/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" name="password" className="inputField"/></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ "text-align": "center" }}><input type="submit" value="LOGIN" className="submitBttn"/></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ "text-align": "center", "fontSize": "12px" }}>New User? <Link to="/Register">Register now.</Link> </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
}
export default withRouter(Login);