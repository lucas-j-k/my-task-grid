import React from 'react';


const ControlPanel = (props) => {
      return (
        <div className="control-panel">
          <button className="button" onClick={props.toggleModal}>Help</button>
          <button className="button" onClick={()=>{props.toggleSidebar('completed', true)}}>Completed</button>
          <button className="button" onClick={()=>{props.toggleSidebar('deferred', true)}}>Deferred</button>
        </div>
      );
    }

export default ControlPanel;
