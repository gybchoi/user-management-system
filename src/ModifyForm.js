import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ModifyForm extends React.Component {
  state = {
    form_open: false,
    nickname: "",
    level: -1
  };

  checkValue = (e = null) => {
    const { nickname, level } = this.state;

    if (nickname === "" || level === -1) {
      e ? e.preventDefault() : alert("아래 폼을 모두 입력해주세요.");
      return false;
    }

    if (nickname.length > 10) {
      e ? e.preventDefault() : alert("닉네임이 너무 깁니다. (10글자 이하)");
      return false;
    }

    if (nickname.includes("'")) {
      e ? e.preventDefault() : alert("SQL 쿼리문은 금지되었습니다.");
      return false;
    }

    if (!Number(level)) {
      e ? e.preventDefault() : alert("레벨은 숫자로 입력해주세요.");
      return false;
    }

    let _level = Number(level);

    if (Math.floor(_level) !== _level && isFinite(_level)) {
      e ? e.preventDefault() : alert("레벨은 정수로 입력해주세요.");
      return false;
    }

    if (_level <= 0 || _level > 10000) {
      e
        ? e.preventDefault()
        : alert("적정 레벨의 범위가 아닙니다. (1 이상 10000 이하");
      return false;
    }

    return true;
  };

  formOpen = () => {
    this.setState({ form_open: true });
  };

  formClose = () => {
    this.setState({ form_open: false });
  };

  render() {
    const { id, nickname, level } = this.props.info;
    const formUrl = "/api/userdata/modify/" + id;
    return (
      <div style={{ display: "inline-block" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: 15 }}
          onClick={this.formOpen}
        >
          Modify
        </Button>
        <Dialog
          open={this.state.form_open}
          onClose={this.formClose}
          aria-labelledby="modifyForm"
        >
          <DialogTitle id="modifyForm">유저 정보 수정</DialogTitle>
          <form
            action={formUrl}
            method="post"
            onSubmit={e => this.checkValue(e)}
          >
            <DialogContent>
              <DialogContentText>User Nickname</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="nickname"
                label={nickname}
                fullWidth
                onChange={e => this.setState({ nickname: e.target.value })}
              />

              <DialogContentText style={{ marginTop: 40 }}>
                User Level
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="level"
                label={level}
                fullWidth
                onChange={e => this.setState({ level: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.formClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (this.checkValue()) this.formClose();
                }}
                color="primary"
                type="submit"
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default ModifyForm;
