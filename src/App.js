import React, { Component } from 'react';

import List from './components/List';
import SidebarList from './components/SidebarList';
import ControlPanel from './components/ControlPanel';
import HelpScreen from './components/HelpScreen';


class App extends Component {

  constructor(){
    super()
    this.state = {
      tasks:[],
      visibleSidebars: {
        completed: false,
        deferred: false
      },
      showModal: false,
      usedIds: [],
    }
    this.addNewTask = this.addNewTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTaskField = this.updateTaskField.bind(this)
    this.updateTaskContent = this.updateTaskContent.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.resetDeferments = this.resetDeferments.bind(this)
    this.flushIds = this.flushIds.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  listIcons = {
    basicTask: "im im-task-o",
    lightbulbTask: "im im-light-bulb",
    researchTask: "im im-laptop-o",
    liveIssuesTask: "im im-warning"
  }

  componentDidMount(){
    let storedTasks = JSON.parse(localStorage.getItem('storedTasks')) || [];
    const storedLastDate = JSON.parse(localStorage.getItem('lastDateAccessed')) || new Date().setHours(0,0,0,0)
    const currentDateNormalized = new Date().setHours(0,0,0,0);
    if(currentDateNormalized !== storedLastDate){
      //Its tomorrow and we need to undefer all tasks
      storedTasks = this.resetDeferments(storedTasks)
      localStorage.setItem('storedTasks', JSON.stringify(storedTasks))
    }
    //Always update the stored date with today's date, whatever happens, as it needs to know the last time we opened app:
    localStorage.setItem('lastDateAccessed', currentDateNormalized)
    this.setState({ 
      tasks: storedTasks,
      usedIds: JSON.parse(localStorage.getItem('usedIds')) || []
    })
  }

  toggleModal(){
    const newValue = this.state.showModal ? false : true;
    this.setState({ showModal: newValue })
  }

  resetDeferments(tasks){
    const resetTasks = tasks.map((task)=>{
      task.deferred = false
      return task
    })
    return resetTasks
  }

  addNewTask(taskType, newTask){
    newTask.taskType = taskType
    newTask.id = this.generateNewId()
    const updatedTaskList = [...this.state.tasks, newTask]
    localStorage.setItem('storedTasks', JSON.stringify(updatedTaskList))
    this.setState({ tasks: updatedTaskList })
  }

  generateNewId(){
    const maxId = this.state.usedIds[this.state.usedIds.length -1] || 0
    const newId = maxId + 1
    const updatedIdArray = [...this.state.usedIds, newId]
    localStorage.setItem('usedIds', JSON.stringify(updatedIdArray))
    this.setState({ usedIds: updatedIdArray })
    return newId
  }

  flushIds(idToDelete){
    const updatedIdArray = [...this.state.usedIds].filter((id)=>{ return id !== idToDelete })
    localStorage.setItem('usedIds', JSON.stringify(updatedIdArray))
    this.setState({ usedIds: updatedIdArray })
  }

  deleteTask(id){
    const confirmedDelete = window.confirm("Are you sure?\nThis action cannot be undone");
    if (!confirmedDelete) return false;
    const updatedTaskList = [...this.state.tasks].filter((task)=>{ return task.id !== id })
    this.flushIds(id)
    localStorage.setItem('storedTasks', JSON.stringify(updatedTaskList))
    this.setState({ tasks: updatedTaskList })
    
  }

  updateTaskField(id, field, value){
    const updatedTaskList = [...this.state.tasks].map((task)=>{
      if(task.id === id){
        task[field] = value
        return task
      } else {
        return task
      }
    })
    localStorage.setItem('storedTasks', JSON.stringify(updatedTaskList))
    this.setState({ tasks: updatedTaskList })
  }

  updateTaskContent(id, newContent){
    const updatedTaskList = [...this.state.tasks].map((task)=>{
      if(task.id === id){
        task.content = newContent
        return task
      } else {
        return task
      }
    })
    localStorage.setItem('storedTasks', JSON.stringify(updatedTaskList))
    this.setState({ tasks: updatedTaskList })
  }

  toggleSidebar(sidebarName, boolean){
    const sideBarState = {...this.state.visibleSidebars}
    Object.keys(sideBarState).forEach(key=>{ sideBarState[key] = false })
    sideBarState[sidebarName] = boolean
    this.setState({
      visibleSidebars: sideBarState
    })
  }

  render() {
    const sharedSidebarProps = {
      tasks: this.state.tasks,
      toggleSidebar: this.toggleSidebar,
      updateTaskField: this.updateTaskField
    }
    const sharedListProps = {
      addNewTask: this.addNewTask,
      updateTaskField: this.updateTaskField,
      updateTaskContent: this.updateTaskContent,
      deleteTask: this.deleteTask,
      tasks: this.state.tasks
    }
    return (
      <div className="app">
        <header className="header-bar">
          <div className="header-bar__left"><span className="header-bar__title">My TaskGrid</span></div>
          <div className="header-bar__right"><ControlPanel toggleSidebar={this.toggleSidebar} toggleModal={this.toggleModal} /></div>
        </header>
        <div className="list-tray">
          <List heading={"Tasks"} icon={this.listIcons.basicTask} taskType="basicTasks" {...sharedListProps} />
          <List heading={"Ideas"} icon={this.listIcons.lightbulbTask} taskType="lightbulbTasks" {...sharedListProps} />
          <List heading={"Research"} icon={this.listIcons.researchTask} taskType="researchTasks" {...sharedListProps} />
          <List heading={"Live Issues"} icon={this.listIcons.liveIssuesTask} taskType="liveIssueTasks" {...sharedListProps} />
          <SidebarList heading={"Completed"} listName={"completed"} visible={this.state.visibleSidebars.completed} {...sharedSidebarProps} />
          <SidebarList heading={"Deferred"} listName={"deferred"} visible={this.state.visibleSidebars.deferred} {...sharedSidebarProps} />
        </div>
        <HelpScreen visible={this.state.showModal} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

export default App;
