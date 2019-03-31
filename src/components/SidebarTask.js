import React, { Component } from 'react';


class SidebarTask extends Component {

  constructor(props){
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(){
    this.props.updateTaskField(this.props.taskId, this.props.listName, false)
  }

  render(){
    return (
      <div className="sidebar-task">
        <div className="sidebar-task__main">
          <button className="sidebar-task__control" onClick={(e)=>{this.handleRemove()}} ><i className="im im-angle-left-circle"></i></button>
          <p className="sidebar-task__text-content">{this.props.content}</p>
        </div>
      </div>
    );
  }
  
}
      

export default SidebarTask;
