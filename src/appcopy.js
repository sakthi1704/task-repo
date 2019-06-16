import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import inputAction from './actions/change_input';
import checkAction from './actions/change_check';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "female"
    }
  }
  gender(value) {
    this.setState(
      {
        value
      }
    )
  }
  render() {
    return (
      <div className="App">
        <h5>Welcome</h5>
        <input
          name="gender"
           type="radio"
           value="female"
           onChange={e => this.gender(e.target.value)}
           checked = {this.state.value === "female"}
         />Female
         <input
           name="gender"
           type="radio"
           value="male"
           onChange={e => this.gender(e.target.value)}
           checked = {this.state.value === "male"}
         />Male
        {/* <input type="text" onChange={e => this.props.inputAction(e.target.value)} />
        {this.props.inputValue}   */}
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {
const { inputValue, checked } = app;
  return {
    inputValue,
    checked
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    inputAction,
    checkAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



