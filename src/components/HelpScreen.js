import React from 'react';


const HelpScreen = (props) => {
      return (
        <div className={ props.visible ? "modal" : "modal modal--hidden" }>
            <div className="modal__panel">
                <div className="modal__heading">
                <h2>How to Use</h2><button className="button" onClick={props.toggleModal}>Close <i className="im im-x-mark"></i></button>
                </div>
                
                <div className="modal__content">
                    <h3 className="modal__content-title">Creating and Editing</h3>
                    <p>Use the forms at the top of each list to add a new task. Add the task content and press 'ENTER' to confirm</p>
                    <p>Use the buttons on each task to modify as follows:</p>
                    <div className="modal__icon-explainer">
                        <span>Edit</span>
                        <p>Allows you to edit the task content. Press 'ENTER' to confirm changes</p>
                    </div>
                    <div className="modal__icon-explainer">
                        <span><i className="im im-x-mark"></i></span>
                        <p>Delete the task (be careful - this can not be undone)</p>
                    </div>
                    <div className="modal__icon-explainer">
                        <span><i className="im im-check-mark"></i></span>
                        <p>Mark task as complete and move it into the completed list</p>
                    </div>
                    <div className="modal__icon-explainer">
                        <span><i className="im im-angle-right"></i></span>
                        <p>Mark the task as deferred. The task will disappear from the list for the rest of the day, and will re-appear tomorrow</p>
                    </div>
                    <h3 className="modal__content-title">Storage</h3>
                    <p>
                        The app currently stores the tasks in your browser's 'Local Storage'. Tasks are saved in a specific browser, so if you access the app
                        in a different browser program, or on a different machine, the tasks will not appear
                    </p>
                </div>
            </div>
        </div>
      );
    }

export default HelpScreen;
