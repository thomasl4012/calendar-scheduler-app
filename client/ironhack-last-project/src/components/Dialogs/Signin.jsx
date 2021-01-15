import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormSignin from "../Forms/FormSignin"

export default class Signin extends Component {

state ={
    open: false
}
handleToggle = () => {
    this.setState({
open: !this.state.open

    })
}

render() {
    const {open} = this.state
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={this.handleToggle}>
        Sign in
      </Button>
      <Dialog open={open} onClose={this.handleToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        Signin
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please signin
          </DialogContentText>
          <FormSignin/>
        </DialogContent>
        <DialogActions>
      
        </DialogActions>
      </Dialog>
    </div>
  );
}}