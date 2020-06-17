// CONTAINS THE IMPLEMENTATION ToDo COMPONENT

import React, { Component } from 'react'

class ToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doneStyle: (props.done) ? { 'text-decoration': 'line-through' } : {},
            checkedVal: (props.done) ? true : false,
        }
    }

    handleCheckChange = (e) => {
        if (this.state.checkedVal === true) {
            this.setState({
                doneStyle: {},
                checkedVal: !this.state.checkedVal
            });
        }
        else {
            this.setState({
                doneStyle: { 'text-decoration': 'line-through' },
                checkedVal: !this.state.checkedVal
            });
        }
    }

    render() {
        return (
            <div>
                <input type="checkbox" defaultChecked={this.state.checkedVal} id={this.props.id} name={this.props.id} onChange={this.handleCheckChange} />
                <label htmlFor={this.props.id}>
                    <div style={this.state.doneStyle}>
                        {/* {this.props.id}  */}
                        {this.props.text}
                    </div>
                </label>
            </div>
        );
    }
}
export default ToDo;