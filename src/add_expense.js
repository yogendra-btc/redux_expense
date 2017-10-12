import React from 'react';
import { Table, Button, Form, FormControl, InputGroup, InputGroupAddon, FormGroup,
Col, Panel, ControlLabel } from 'react-bootstrap';
import { actionCreators } from './user';
import { connect } from 'react-redux';
import axios from 'axios';


const mapStateToProps = (state) => ({
    todos: state.todos,
    hide: state.hide,
  })

class NewExpense extends React.Component {
    constructor(props){
      super(props);
      this.state = ({
          create : true,
      })
      this.newExpense = this.newExpense.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    newExpense(e){
        e.preventDefault();
        const {dispatch} = this.props;
        axios.post('http://127.0.0.1:8000/users_expenses/',{data:{
            'user_id':this.props.todos[0][0].user_id,
            "expense_cost":this.state.expense_cost,
            "expense_type":this.state.expense_type,
            "expense_description":this.state.expense_description}})
        .then((response) => {
            dispatch(actionCreators.visible(!this.props.hide));
            dispatch(actionCreators.add(
                {
                    "id":response.data.id,
                    "user_id":response.data.user_id,
                    "expense_cost":response.data.expense_cost,
                    "expense_type":response.data.expense_type,
                    "expense_description":response.data.expense_description,
                    "expense_datetime":response.data.expense_datetime
                }
            ));
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return(
            <div>
            <Col><Panel collapsible expanded={!this.props.hide}>
                <Form method="post" inline>
                    <ControlLabel>Enter New Expense</ControlLabel>
                        <FormGroup>
                            <Col sm={12} >
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Expense"
                                    onChange={this.handleChange}
                                    name="expense_cost"
                                />
                                <InputGroup.Addon>.00</InputGroup.Addon>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={12}>
                            <FormControl
                                type="text"
                                placeholder="Enter Expense Type"
                                onChange={this.handleChange}
                                name="expense_type"
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={12}>
                            <FormControl
                                type="text"
                                placeholder="Enter Expense Discription"
                                onChange={this.handleChange}
                                name="expense_description"
                            />
                            </Col>
                        </FormGroup>
                        <Button onClick={this.newExpense}>Submit</Button>
                </Form>
                </Panel>
            </Col>
        </div>
        );
}
}
export default connect(mapStateToProps)(NewExpense)