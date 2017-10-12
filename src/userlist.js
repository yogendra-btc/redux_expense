import React from 'react';
import { Table  } from 'react-bootstrap';

export default class UserList extends React.Component {
    constructor(props){
      super(props);
      this.state = ({
          user : false,
      })
      console.log("USERS",this.props.todos);
    }

    render(){
        return(
            <Table responsive>
            <thead>
            <tr className="title">
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
            </tr>
            </thead>
            <tbody>
                {
                    Object.keys(this.props.todos).map(function(key, index) {
                    return (
                    <tr key={key}><td>{this.props.todos[key]['username']}</td>
                    <td>{this.props.todos[key]['username']}</td>
                    <td>{this.props.todos[key]['email']}</td>
                    </tr>
                    );
                    },this)
                }
            </tbody>
        </Table>
        );
}
}