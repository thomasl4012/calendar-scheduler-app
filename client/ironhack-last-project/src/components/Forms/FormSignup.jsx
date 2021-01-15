import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FilledInput from '@material-ui/core/FilledInput';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';

const team = [
  {
    value: 'red',
    label: 'Red',
  },
  {
    value: 'blue',
    label: 'Blue',
  },
  {
    value: 'yellow',
    label: 'Yellow',
  },
];


class FormSignup extends Component {
  static contextType = UserContext;

  state = [];

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
        <br/>
           <TextField
          id="outlined-text-input"
          label="Last Name"
          type="text"
          autoComplete="current-password"
          variant="outlined"
          name="lastName"

        />
        <br/>
    <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-password"
          variant="outlined"
          name="email"

        />
        <br/>
    <TextField
       id="outlined-select-currency"
          label="Choose your team"
          select
        
          variant="outlined"
          name="team"
          value={team}
           onChange={this.handleChange}
          

        >
        {team.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

</TextField>
<br/>
         <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          name="password"

        />
        <br/>
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
