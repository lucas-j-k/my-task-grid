import React, { Component } from 'react';


class Task extends Component {

    constructor(props){
      super(props)
      this.state = {
        editMode: false,
        editFormValue: this.props.content,
      }
      this.handleDelete = this.handleDelete.bind(this)
      this.handleEditToggle = this.handleEditToggle.bind(this)
      this.handleEditFormChange = this.handleEditFormChange.bind(this)
      this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this)
      this.handleComplete = this.handleComplete.bind(this)
      this.handleDefer = this.handleDefer.bind(this)
    }

    handleDelete(){
      this.props.deleteTask(this.props.taskType, this.props.taskIndex)
    }

    handleEditToggle(){
      const newValue = this.state.editMode ? false: true
      this.setState({ editMode: newValue })
    }

    handleEditFormChange(e){
      this.setState({
        editFormValue: e.target.value
      })
    }

    handleEditFormSubmit(e){
      e.preventDefault()
      this.handleEditToggle()
      this.props.updateTaskContent(this.props.taskType, this.props.taskIndex, this.state.editFormValue)
    }

    handleComplete(){
      this.props.updateTaskField(this.props.taskType, this.props.taskIndex, 'completed', true)
    }

    handleDefer(){
      this.props.updateTaskField(this.props.taskType, this.props.taskIndex, 'deferred', true)
    }

    generateTaskBody(){
      let taskBodyMarkup = null;
      if(this.state.editMode){
        taskBodyMarkup = (
          <form onSubmit={this.handleEditFormSubmit} className="task__edit-form">
            <input type="text" className="task__edit-input" value={this.state.editFormValue} onChange={this.handleEditFormChange} ></input>
          </form>
        )
      } else {
          taskBodyMarkup = (<p className="task__text-content">{this.props.content}</p>)
      }
      return taskBodyMarkup
    }

    render(){
      return (
        <div className={this.state.editMode ? "task task--editing" : "task"}>
          <div className="task__control-panel">
            <button className="task__control" onClick={this.handleEditToggle}>{ this.state.editMode ? "Cancel" : "Edit" }</button>
            <button className="task__control" onClick={this.handleDelete}><i className="im im-x-mark"></i></button>
            <button className="task__control" onClick={this.handleComplete}><i className="im im-check-mark"></i></button>
            <button className="task__control" onClick={this.handleDefer}><i className="im im-angle-right"></i></button>
          </div>
          <div className="task__main">
            {this.generateTaskBody()}
          </div>
        </div>
      );
    }
}

export default Task;
