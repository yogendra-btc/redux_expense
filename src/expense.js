import React, { Component } from 'react';
import './App.css';
import { actionCreators } from './user';
import NewExpense from './add_expense';
import axios from 'axios';
import { connect } from 'react-redux'
import {Table, Button, FormControl, Form} from 'react-bootstrap'



const mapStateToProps = (state) => ({
    todos: state.todos,
    hide: state.hide,
    edit: state.edit,
    token: state.token,
  })

class Expense extends Component {
    constructor(props){
      super(props);
      this.state = {},

      this.handleClick = this.handleClick.bind(this);
      this.edit_expense = this.edit_expense.bind(this);
      this.handleView = this.handleView.bind(this);
      this.handlePanel = this.handlePanel.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
      const {dispatch} = this.props
      axios.defaults.headers.common['user'] = 'ad0b39b669c87dc7307bf6a2de22f68f4049dbaf';
      axios.get('http://127.0.0.1:8000/users_expenses/')
      .then((response) =>{
        dispatch(actionCreators.list(response.data[0]));
      })
      console.log("%%%%%%%%%%%%%",this.props.token)
    }

    handleClick = (index) => {
      const {dispatch} = this.props
      const value = index.target.value;
      axios.delete('http://127.0.0.1:8000/users_expenses/',{data:{'pk':index.target.id}})
      .then((response) => {
          if(response.status === 204){
            dispatch(actionCreators.remove(value))
          }
        })
      }

      edit_expense = (index) => {
        var edit_data = index.target.closest('tr').children;
        console.log(this.props.token);
        this.setState({
          id: edit_data[0].textContent,
          user_id: edit_data[1].textContent,
          expense_cost:edit_data[2].textContent,
          expense_type:edit_data[3].textContent,
          expense_description:edit_data[4].textContent,
          expense_datetime:edit_data[5].textContent
      });
      
      const {dispatch} = this.props;
      dispatch(actionCreators.edit(index.target.id));
      }
      handlePanel(){
        const {dispatch} = this.props;
        dispatch(actionCreators.edit(""));
      }
      handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
      handleView(){
        const {dispatch} = this.props;
        dispatch(actionCreators.visible(!this.props.hide));
      }

      handleSubmit(){
        const {dispatch} = this.props;
        var new_data = {
                    "id":this.state.id,
                    "user_id":this.state.user_id,
                    "expense_cost":this.state.expense_cost,
                    "expense_type":this.state.expense_type,
                    "expense_description":this.state.expense_description,
                    "expense_datetime":this.state.expense_datetime,
                  };
        dispatch(actionCreators.save(new_data));
        axios.put('http://127.0.0.1:8000/users_expenses/',{data:
            {pk:this.state.id,
            expense_cost:this.state.expense_cost,
            expense_type:this.state.expense_type,
            expense_description:this.state.expense_description}})
      }

    render() {
      var current_data = {}
      console.log("yeh rha token",this.props.token)
      console.log('PROPS',this.props.todos);
      const {todos} = this.props
      console.log("THIS STATE", todos);
      console.log("hide",this.props.hide)
      if(todos.length>0){
        current_data = todos
      }
      const TableInstanse = (
        <Table responsive>
          <thead>
              <tr className="title">
                <th>ID</th>
                <th>USER_ID</th>
                <th>EXPENSE_COST</th>
                <th>EXPENSE_TYPE</th>
                <th>EXPENSE_DESCRIPTION</th>
                <th>EXPENSE_DATETIME</th>
                <th>DELETE</th>
                <th>EDIT</th>
              </tr>
          </thead>
          <tbody>
              {
                Object.keys(current_data).map(function(key, index) {
                  console.log(Object.keys(current_data).length)
                  if(current_data[key]['id'] != this.props.edit)
                    return (
                        <tr key={key}>
                          <td>{current_data[key]['id']}</td>
                          <td>{current_data[key]['user_id']}</td>
                          <td>{current_data[key]['expense_cost']}</td>
                          <td>{current_data[key]['expense_type']}</td>
                          <td>{current_data[key]['expense_description']}</td>
                          <td>{current_data[key]['expense_datetime']}</td>
                          <td><Button className="glyphicon glyphicon-trash" bsStyle="danger" id={current_data[key].id} onClick={this.handleClick.bind(current_data[key].id)} value={index}></Button></td>
                          <td><Button className="glyphicon glyphicon-pencil" bsStyle="primary" id={current_data[key].id} onClick={this.edit_expense} value={current_data[key].id} ></Button></td>
                        </tr>
                    );
                  else{
                    return(
                    <tr key={key}>
                      <td colSpan={8}>
                          <Form  inline>
                            <Table responsive>
                              <tr>
                            <td className="id">
                              <FormControl
                                  type="text"
                                  ref="id"
                                  className="disable change"
                                  disabled
                                  value={this.state.id}
                                  placeholder="Enter Expense Cost"
                                  onChange={this.handleChange}
                                  name="id"
                              />
                            </td>
                            <td className="user_id">
                              <FormControl
                                  type="text"
                                  ref="user_id"
                                  className="disable change"
                                  disabled
                                  value={this.state.user_id}
                                  placeholder="user_id"
                                  onChange={this.handleChange}
                                  name="user_id"
                              />
                            </td>
                            <td className="td-cost">
                              <FormControl
                                  type="text"
                                  ref="cost"
                                  className="change cost"
                                  value={this.state.expense_cost}
                                  placeholder="Enter Expense Cost"
                                  onChange={this.handleChange}
                                  name="expense_cost"
                              />
                            </td>
                            <td className="td-type">
                              <FormControl
                                  type="text"
                                  className="change type"
                                  value={this.state.expense_type}
                                  placeholder="Enter Expense Type"
                                  onChange={this.handleChange}
                                  name="expense_type"
                              />
                            </td>
                            <td className="td-type">
                              <FormControl
                                  type="text"
                                  className="change description"
                                  value={this.state.expense_description}
                                  placeholder="Enter Expense Description"
                                  onChange={this.handleChange}
                                  name="expense_description"
                              />
                            </td>
                            <td className="td-date">
                              <FormControl
                                  type="text"
                                  className="change date"
                                  value={this.state.expense_datetime}
                                  placeholder="Enter Expense DateTime"
                                  onChange={this.handleChange}
                                  name="expense_datetime"
                              />
                            </td>
                            <td className="td-edit">
                              <Button className="edit glyphicon glyphicon-save" onClick={this.handleSubmit} bsStyle="primary"></Button>
                            </td>
                            <td className="td-cancel">
                              <Button className="cancel glyphicon glyphicon-remove" bsStyle="danger" onClick={this.handlePanel}></Button>
                            </td>
                            </tr>
                            </Table>
                          </Form>
                      </td>
                    </tr>);
                  }
                },this)
              }
          </tbody>
    </Table>
        );
       
      return (
     
        <div style={styles.container}>
          {TableInstanse}
          <div>
              <Button bsStyle="success" onClick={this.handleView}>Add Expense</Button><br/><br/>
          </div>
          <NewExpense hide={this.props.hide}/>
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
export default connect(mapStateToProps)(Expense)
  