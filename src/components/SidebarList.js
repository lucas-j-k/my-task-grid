import React, { Component } from 'react';

import SidebarTask from './SidebarTask';


class SidebarList extends Component {

  generateTasks(){
    const listName = this.props.listName
    const taskComponents = this.props.tasks.map((task) => {
      if(task[listName]){
        return (<SidebarTask key={task.id} taskType={task.taskType} taskId={task.id} content={task.content} listName={this.props.listName} updateTaskField={this.props.updateTaskField} />)
      }
      else return false
    })
    return taskComponents
  }

  render(){
    const listClassName = this.props.visible ? "sidebar" : "sidebar sidebar--hidden"
    return (
      <div className={listClassName}>
        <div className="sidebar__heading font-title">
          <h3 className="sidebar__heading-text">{this.props.heading}</h3>
          <button className="button" onClick={()=>{this.props.toggleSidebar(this.props.listName, false)}}>Close <i className="im im-x-mark"></i></button>
        </div>
        { this.generateTasks() }
      </div>
    );
  }
}

export default SidebarList;
