import React from 'react';


const ControlPanel = (props) => {
      return (
        <div className="control-panel">
          <button className="control-panel__button" onClick={()=>{props.toggleSidebar('completed', true)}}>Completed</button>
          <button className="control-panel__button" onClick={()=>{props.toggleSidebar('deferred', true)}}>Deferred</button>
        </div>
      );
    }

export default ControlPanel;
