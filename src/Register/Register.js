// CONTAINS THE REGISTER COMPONENT

import React, { useCallback } from "react";
import { withRouter } from "react-router";
import fireb from '../FirebaseConfig'
import './Register.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://us-central1-todo-5cda6.cloudfunctions.net/api';

const Register = ({ history }) => {

    const handleRegistration = useCallback(async event => {
        event.preventDefault();
        const { email, password, cpassword } = event.target.elements;
        if (password.value != cpassword.value) {
            alert('Error: Passwords do not match')
        }
        else {
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
        }
    }, [history]);

    return (
        <div className="RegisterFULL">
            <p className="Marvel">MARVEL</p><p className="Title">&nbsp;TO-DO</p><br></br>
            <div className="Register">
                <p className="RegTitle">REGISTER</p>
                <form onSubmit={handleRegistration}>
                    <table>
                        <tr>
                            <td>Email:</td>
                            <td><input type="text" name="email" className="inputField" /></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" name="password" className="inputField" /></td>
                        </tr>
                        <tr>
                            <td>Confirm Password:</td>
                            <td><input type="password" name="cpassword" className="inputField" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ "text-align": "center" }}><input type="submit" value="SUBMIT" className="submitBttn" /></td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );

}

export default withRouter(Register);