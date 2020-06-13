import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            cpassword: "",
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
        console.log(this.state.username);
    }

    render() {
        return (
            <div className="Register">
                <p style={{ "font-size": "30px", "fontWeight": "bolder" }}>REGISTER</p>
                <table>
                    <tr>
                        <td>Username:</td>
                        <td><input type="text" name="username" value={this.state.username} onChange={this.updateState} /></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="password" name="password" id="" value={this.state.password} onChange={this.updateState} /></td>
                    </tr>
                    <tr>
                        <td>Confirm Password:</td>
                        <td><input type="password" name="password" id="" value={this.state.cpassword} onChange={this.updateState} /></td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{"text-align":"center"}}><input type="submit" value="SUBMIT" /></td>
                    </tr>
                </table>

            </div>
        );
    }
}

export default Register;