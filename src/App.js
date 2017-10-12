import React, { Component } from 'react';
import './App.css';
import { actionCreators } from './user';
import axios from 'axios';
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import UserList from './userlist'

const mapStateToProps = (state) => ({
  todos: state.todos,
})


class App extends Component {
    constructor(props){
      super(props);
      
      // const {store} = this.props;
      const {dispatch} = this.props
      axios.get('http://127.0.0.1:8000/users/')
      .then((response) =>{
          console.log(response.data);
          // store.dispatch(actionCreators.list(response.data));
          dispatch(actionCreators.list(response.data));
      });
    }
  
    render() {
      
      console.log('PROPS',this.props.todos);
      const {todos} = this.props
      console.log("THIS STATE", todos);

      return (
        <div>
          <UserList todos={todos} /> 
        </div>
      )
    }
  }
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
export default connect(mapStateToProps)(App)
  