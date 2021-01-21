import React, { Component } from "react";
import { UserContext } from "../Auth/UserContext";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-password-input"
              label="email"
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
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignin);
