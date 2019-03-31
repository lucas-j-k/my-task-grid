import React, { Component } from 'react';


class SidebarTask extends Component {

  constructor(props){
    super(props)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  handleStatusChange(e){
    console.log(e.target)
    this.props.updateTaskField(this.props.taskType, this.props.taskId, 'completed', false)
  }

  render(){
    return (
      <div className="sidebar-task">
        <div className="sidebar-task__main">
          <button className="sidebar-task__control" onClick={(e)=>{this.handleStatusChange(e)}} ><i className="im im-angle-left-circle"></i></button>
          <p className="sidebar-task__text-content">{this.props.content}</p>
        </div>
      </div>
    );
  }
  
}
      

export default SidebarTask;
