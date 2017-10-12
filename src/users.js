import React from 'react';
import axios from 'axios';

export default class Demo extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            data: '',
        }
    }

    componentDidMount() {
        this.UserExpense();
      }

    UserExpense(){
          axios.get('http://127.0.0.1:8000/users/')
          .then((response) =>{
            this.setState({data:response.data});
          }
        )   
      }
    render(){
    return (
    <div >
        {this.state.data}
    </div>
);
}
}