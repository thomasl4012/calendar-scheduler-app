import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormEditTeam from "../Forms/FormEditTeam";
import UpdateIcon from "@material-ui/icons/Update";
import Icon from "@material-ui/core/Icon";

export default class EditTeam extends Component {
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
        <Button
          variant="contained"
          color="default"
          onClick={this.handleToggle}
          endIcon={
            <Icon>
              <UpdateIcon fontSize="small"></UpdateIcon>
            </Icon>
          }
        >
          Update
        </Button>

        {/* <IconButton aria-label="Update" onClick={this.handleToggle}>
          <UpdateIcon fontSize="small" />
        </IconButton> */}
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fillup the form to edit the team
            </DialogContentText>
            <FormEditTeam
              data={this.props.data}
              onChange={this.props.onChange}
              onSubmit={this.props.onSubmit}
              teamId={this.props.teamId}
            />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    );
  }
}
