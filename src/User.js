import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import ModifyForm from "./ModifyForm";

class User extends React.Component {
  render() {
    const { id, nickname, level } = this.props;
    return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>{nickname}</TableCell>
        <TableCell>{level}</TableCell>
        <TableCell align="right">
          <ModifyForm
            info={{
              id: id,
              nickname: nickname,
              level: level
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.deleteButton(id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default User;
