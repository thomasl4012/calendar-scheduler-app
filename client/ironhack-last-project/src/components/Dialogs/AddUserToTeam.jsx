import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormAddUserToTeam from "../Forms/FormAddUserToTeam";
import ApiHandler from "../../api/apiHandler";
export default class AddUserToTeam extends Component {
  state = {
    open: false,
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleToggle}>
          Add a user to a team
        </Button>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fillup the from to add a user to a team
            </DialogContentText>
            <FormAddUserToTeam
              onChange={this.props.handleChange}
              onSubmit={this.props.handleAddUserSubmit}
              dataFiltered={this.props.dataFiltered}
              data_team={this.props.dataTeam}
            />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    );
  }
}
