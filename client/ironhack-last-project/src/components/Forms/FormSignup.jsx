import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

class FormSignup extends Component {
  static contextType = UserContext;

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <TextField
            id="outlined-text-input"
            label="First Name"
            type="text"
            autoComplete="current-password"
            variant="outlined"
            name="firstName"
          />
          <br />
          <TextField
            id="outlined-text-input"
            label="Last Name"
            type="text"
            autoComplete="current-password"
            variant="outlined"
            name="lastName"
          />
          <br />
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="current-password"
            variant="outlined"
            name="email"
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            name="password"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
          >
            Sign up
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
