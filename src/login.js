import React from 'react';
import axios from 'axios';
import { Button, FormGroup,  FormControl,Col,Form } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { actionCreators } from './user';
import { connect } from 'react-redux';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const mapStateToProps = (state) => ({
    token: state.token
  })

class Login extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            data: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    signIn(){
        const {dispatch} = this.props
        axios.post('http://127.0.0.1:8000/login/',{username:this.state.username,
            email:this.state.email,password:this.state.password})
            .then((response) => {
                dispatch(actionCreators.login(response.data.key));
                browserHistory.push('/expense');
              })
    }
    
    render(){
        const form = <Form method="post">
            <FormGroup>
                <Col sm={4} >
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter Username"
                        onChange={this.handleChange}
                        name="username"
                    />
                </Col>
            </FormGroup><br/><br/>
            <FormGroup>
                <Col sm={4}>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter Email"
                    onChange={this.handleChange}
                    name="email"
                />
                </Col>
            </FormGroup><br/>
            <FormGroup>
                <Col sm={4}>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter Password"
                    onChange={this.handleChange}
                    name="password"
                />
                </Col>
            </FormGroup><br/>
            <Button className="login" onClick={this.signIn}>Submit</Button>
    </Form>
    return (
    <div >
        {form}
    </div>
);
}
}
export default connect(mapStateToProps)(Login)