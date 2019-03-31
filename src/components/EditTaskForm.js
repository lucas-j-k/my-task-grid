import React, { Component } from 'react';


class NewTaskForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            inputValue: "",
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleFormSubmit(e){
        e.preventDefault()
        const newTask = {
            content: this.state.inputValue
        }  
        this.props.addNewTask(this.props.taskType, newTask)
        this.setState({ inputValue: "" })    
    }

    handleInputChange(e){
        const element = e.target
        const newHeight = element.scrollHeight + "px";
        this.setState({
            inputValue: e.target.value,
            editInputHeight: newHeight
        })
    }

    render(){
        return (
        <div className="new-task">
            <h4 className="new-task__heading">Create New Task</h4>
            <form onSubmit={this.handleFormSubmit} className="new-task__form">
                <input type="text" className="new-task__input" onChange={this.handleInputChange} value={this.state.inputValue} placeholder="Add New Task and press ENTER" />
            </form>
        </div>
        );
    }
}

export default NewTaskForm;
