import React, { Component } from 'react';

import List from './components/List';
import SidebarList from './components/SidebarList';
import ControlPanel from './components/ControlPanel';


class App extends Component {

  constructor(){
    super()
    this.state = {
      tasks:{
        basicTasks: [],
        lightbulbTasks: [],
        researchTasks: [],
        liveIssueTasks: []
      },
      visibleSidebars: {
        completed: false,
        deferred: false
      },
      usedIds: [],
      renderDeferred: false
    }
    this.addNewTask = this.addNewTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTaskField = this.updateTaskField.bind(this)
    this.updateTaskContent = this.updateTaskContent.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.resetDeferments = this.resetDeferments.bind(this)

  }

  listIcons = {
    basicTask: "im im-task-o",
    lightbulbTask: "im im-light-bulb",
    researchTask: "im im-laptop-o",
    liveIssuesTask: "im im-warning"
  }

  componentDidMount(){
    const storedTasks = JSON.parse(localStorage.getItem('storedTasks')) || {};
    const storedLastDate = JSON.parse(localStorage.getItem('lastDateAccessed')) || new Date().setHours(0,0,0,0)
    const currentDateNormalized = new Date().setHours(0,0,0,0);
    let tasks = {
      basicTasks: storedTasks.basicTasks || [],
      lightbulbTasks: storedTasks.lightbulbTasks || [],
      researchTasks: storedTasks.researchTasks || [],
      liveIssueTasks: storedTasks.liveIssueTasks || []
    }
    if(currentDateNormalized !== storedLastDate){
      //Its tomorrow and we need to undefer all tasks
      tasks = this.resetDeferments(tasks)
      localStorage.setItem('storedTasks', JSON.stringify(tasks))
    }
    //Always update the stored date with today's date, whatever happens, as it needs to know the last time we opened app:
    localStorage.setItem('lastDateAccessed', currentDateNormalized)
    this.setState({ 
      tasks: tasks,
      usedIds: JSON.parse(localStorage.getItem('usedIds')) || []
    })
  }

  resetDeferments(tasks){
    const resetTasks = {}
    Object.keys(tasks).forEach((key)=>{
      const currentTaskList = tasks[key]
      const resetTaskList = currentTaskList.map((task)=>{
        task.deferred = false
        return task
      })
      resetTasks[key] = resetTaskList
    })
    return resetTasks
  }

  addNewTask(taskType, newTask){
    const currentTasks = this.state.tasks
    const currentTaskList = currentTasks[taskType]
    newTask.taskType = taskType
    newTask.id = this.generateNewId()
    const updatedTaskList = [...currentTaskList, newTask]
    currentTasks[taskType] = updatedTaskList
    localStorage.setItem('storedTasks', JSON.stringify(currentTasks))
    this.setState({ tasks: currentTasks })
  }

  generateNewId(){
    const maxId = this.state.usedIds[this.state.usedIds.length -1] || 0
    const newId = maxId + 1
    const updatedIdArray = [...this.state.usedIds, newId]
    localStorage.setItem('usedIds', JSON.stringify(updatedIdArray))
    this.setState({ usedIds: updatedIdArray })
    return newId
  }

  deleteTask(taskType, id){
    console.log(taskType)
    console.log(id)
    const confirmedDelete = window.confirm("Are you sure?\nThis action cannot be undone");
    if (!confirmedDelete) return false;
    const currentTasks = {...this.state.tasks}
    const taskListToFilter = [...currentTasks[taskType]]
    const updatedTaskList = taskListToFilter.filter((task)=>{ return task.id !== id })
    console.log(updatedTaskList)
    currentTasks[taskType] = updatedTaskList
    localStorage.setItem('storedTasks', JSON.stringify(currentTasks))
    this.setState({ tasks: currentTasks })
    
  }

  updateTaskField(taskType, id, field, value){
    const currentTasks = {...this.state.tasks}
    const currentTaskList = currentTasks[taskType]
    currentTaskList.forEach((task)=>{
      if(task.id === id){
        task[field] = value
      }
    })
    currentTasks[taskType] = currentTaskList
    console.log("CURRENTTASKS COPY:  ", currentTasks)
    console.log("STATE - ORIGINAL:   ", this.state.tasks)
    localStorage.setItem('storedTasks', JSON.stringify(currentTasks))
    this.setState({ tasks: currentTasks })
  }

  updateTaskContent(taskType, id, newContent){
    const currentTasks = {...this.state.tasks}
    const currentTaskList = [...currentTasks[taskType]]
    const updatedTaskList = currentTaskList.map((task)=>{
      if(task.id === id){
        task.content = newContent
        return task
      } else {
        return task
      }
    })
    currentTasks[taskType] = updatedTaskList
    localStorage.setItem('storedTasks', JSON.stringify(currentTasks))
    this.setState({ tasks: currentTasks })
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
      basicTasks: this.state.tasks.basicTasks,
      lightbulbTasks: this.state.tasks.lightbulbTasks,
      researchTasks: this.state.tasks.researchTasks,
      liveIssueTasks: this.state.tasks.liveIssueTasks,
      toggleSidebar: this.toggleSidebar,
      updateTaskField: this.updateTaskField
    }
    const sharedListProps = {
      addNewTask: this.addNewTask,
      updateTaskField: this.updateTaskField,
      updateTaskContent: this.updateTaskContent,
      deleteTask: this.deleteTask
    }
    return (
      <div className="App">
        <header className="header-bar">
          <div className="header-bar__left"><span className="header-bar__title">My Tasks</span></div>
          <div className="header-bar__right"><ControlPanel toggleSidebar={this.toggleSidebar} /></div>
        </header>
        <div className="list-tray">
          <List heading={"Tasks"} icon={this.listIcons.basicTask} tasks={this.state.tasks.basicTasks} taskType="basicTasks" {...sharedListProps} />
          <List heading={"Ideas"} icon={this.listIcons.lightbulbTask} tasks={this.state.tasks.lightbulbTasks} taskType="lightbulbTasks" {...sharedListProps} />
          <List heading={"Research"} icon={this.listIcons.researchTask} tasks={this.state.tasks.researchTasks} taskType="researchTasks" {...sharedListProps} />
          <List heading={"Live Issues"} icon={this.listIcons.liveIssuesTask} tasks={this.state.tasks.liveIssueTasks} taskType="liveIssueTasks" {...sharedListProps} />
          <SidebarList heading={"Completed"} listName={"completed"} visible={this.state.visibleSidebars.completed} {...sharedSidebarProps} />
          <SidebarList heading={"Deferred"} listName={"deferred"} visible={this.state.visibleSidebars.deferred} {...sharedSidebarProps} />
          
        </div>
      </div>
    );
  }
}

export default App;
