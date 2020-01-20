import React from "react";
import User from "./User";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import NewForm from "./NewForm";

class App extends React.Component {
  state = {
    user_data: []
  };

  deleteUserData = async id => {
    if (window.confirm(`정말 id ${id} 유저를 삭제하시겠습니까?`)) {
      var index = this.state.user_data.findIndex(user => user.id === id);
      var user_data = this.state.user_data;
      user_data.splice(index, 1);
      this.setState({ user_data: user_data });

      fetch("/api/userdata/delete/" + id);
    }
  };

  componentDidMount() {
    this.getUserData()
      .then(data => this.setState({ user_data: data }))
      .catch(err => console.log(err));
  }

  getUserData = async () => {
    const response = await fetch("/api/userdata");
    const body = await response.json();

    return body;
  };

  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "orange",
            width: "100%",
            height: 70,
            color: "white",
            fontSize: 30,
            textAlign: "center"
          }}
        >
          User Management System
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nickname</TableCell>
              <TableCell>Level</TableCell>
              <TableCell align="right">Managements</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.user_data.map((user, index) => (
              <User
                key={index}
                id={user.id}
                nickname={user.nickname}
                level={user.level}
                deleteButton={this.deleteUserData}
              />
            ))}
          </TableBody>
        </Table>
        <NewForm />
      </div>
    );
  }
}

export default App;
