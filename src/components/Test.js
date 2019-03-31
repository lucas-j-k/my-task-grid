import React, { Component } from 'react';


class Test extends Component {

    componentDidMount(){
        console.log(this.props)
    }

  render(){
    
    return (
      <div className="list">
      </div>
    );
  }
}

export default Test;
