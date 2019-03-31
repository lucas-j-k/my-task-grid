import React, { Component } from 'react';

import Task from './Task';
import NewTaskForm from './NewTaskForm';

class List extends Component {

  generateTasks(){
    const taskComponents = this.props.tasks.map((task, index) => {
      if(!task.completed && !task.deferred){
        return (<Task taskType={this.props.taskType} content={task.content} completed={task.completed} deferred={task.deferred} key={index} taskId={task.id} updateTaskField={this.props.updateTaskField} updateTaskContent={this.props.updateTaskContent} deleteTask={this.props.deleteTask} />)
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
