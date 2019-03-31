import React, { Component } from 'react';

import Task from './Task';
import NewTaskForm from './NewTaskForm';

class List extends Component {

  generateTasks(){
    const sharedTaskMethods = {
      updateTaskField: this.props.updateTaskField,
      updateTaskContent: this.props.updateTaskContent,
      deleteTask: this.props.deleteTask
    }
    const taskComponents = this.props.tasks.map((task) => {
      if(!task.completed && !task.deferred && task.taskType === this.props.taskType){
        return (<Task taskType={this.props.taskType} content={task.content} key={task.id} taskId={task.id} {...sharedTaskMethods} />)
      } else {
        return false
      }
    })
    return taskComponents
  }

  render(){
    return (
      <div className="list">
        <h3 className="list__heading font-title">
          <span className="list__heading-text">{this.props.heading}</span>
          <span className="list__icon"><i className={this.props.icon}></i></span>
        </h3>
        <NewTaskForm  taskType={this.props.taskType} addNewTask={this.props.addNewTask} />
        { this.generateTasks() }
      </div>
    );
  }
}

export default List;
