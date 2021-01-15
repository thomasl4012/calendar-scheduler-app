import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormSignup from "../Forms/FormSignup"

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
      <Button variant="contained" color="primary" onClick={this.handleToggle}>
        Sign up
      </Button>
      <Dialog open={open} onClose={this.handleToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        Signup
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fillup the from to sign up
          </DialogContentText>
          <FormSignup/>
        </DialogContent>
        <DialogActions>
      
        </DialogActions>
      </Dialog>
    </div>
  );
}}