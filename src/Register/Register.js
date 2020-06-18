// CONTAINS THE REGISTER COMPONENT

import React, { useCallback } from "react";
import { withRouter } from "react-router";
import fireb from '../FirebaseConfig'
import axios from 'axios'
axios.defaults.baseURL = 'https://us-central1-todo-5cda6.cloudfunctions.net/api';

const Register = ({ history }) => {

    const handleRegistration = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const newUser = {
            email: email.value,
            pass: password.value
        }
        try {
            // await fireb
            //     .auth()
            //     .createUserWithEmailAndPassword(email.value, password.value);
            // history.push("/");

            // CREATING NEW USER 
            await axios.post('/user/new', newUser)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('AuthToken', response.data.token);
                    localStorage.setItem('userID', response.data.uid)
                    // LOGGING IN AS NEW USER TO UPDATE currentUser
                    fireb
                        .auth()
                        .signInWithEmailAndPassword(email.value, password.value);
                    history.push("/");
                })
        } catch (error) {
            alert(error.response.data.message);
        }
    }, [history]);

    return (
        <div className="Register">
            <p style={{ "font-size": "30px", "fontWeight": "bolder" }}>REGISTER</p>
            <form onSubmit={handleRegistration}>
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
                        <td>Confirm Password:</td>
                        <td><input type="password" name="cpassword" /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{ "text-align": "center" }}><input type="submit" value="SUBMIT" /></td>
                    </tr>
                </table>
            </form>
        </div>
    );

}

export default withRouter(Register);