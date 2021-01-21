import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormEditUser from "../Forms/FormEditUser";

export default class UserEdit extends Component {
  state = {
    open: false,
    id: "",
  };
  handleToggle = () => {
    console.log(this.props.id);
    this.setState({
      open: !this.state.open,
      id: this.props.id,
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleToggle}>
          update
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fillup the form to edit the user
            </DialogContentText>
            <FormEditUser id={this.state.id} />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    );
  }
}
