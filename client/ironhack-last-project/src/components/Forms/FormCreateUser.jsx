import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import ApiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";

class FormCreateUser extends Component {
  static contextType = UserContext;

  state = {
    data: [],
    team: "",
    color: "",
    firstName: " ",
    lastName: "",
    email: "",
    errors: {},
  };

  validate = () => {
    const errors = {};

    if (this.state.firstName.trim() === "")
      errors.firstName = "First name is required";

    if (this.state.lastName.trim() === "")
      errors.lastName = "Last name is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  componentDidMount() {
    ApiHandler.get("/api/team")
      .then((apiResponse) => {
        const data = apiResponse.data;
        this.setState({
          data,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validateProperty = ({ name, value }) => {
    if (name === "firstName") {
      if (value.trim() === "") return "First name is required";
    }
    if (name === "lastName") {
      if (value.trim() === "") return "Last name  is required";
    }
  };

  handleChange = (event) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.target);
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
    ApiHandler.post("/api/user/create", this.state)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  render() {
    const { errors } = this.state;

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
            {...(errors &
              {
                error: true,
                label: errors.firstName,
                variant: "outlined",
                id: "outlined-error-helper-text",
                defaultValue: errors.firstName,
              })}
          />

          <br />
          <TextField
            id="outlined-text-input"
            label="Last Name"
            type="text"
            autoComplete="current-password"
            variant="outlined"
            name="lastName"
            {...(errors && {
              error: true,
              label: errors.lastName,
              variant: "outlined",
              id: "outlined-error-helper-text",
              defaultValue: errors.firstName,
            })}
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
            id="outlined-select-currency"
            label="Choose your team"
            select
            variant="outlined"
            name="team"
            onChange={this.handleChange}
          >
            {this.state.data.map((option) => (
              <MenuItem
                key={option.title.toLowerCase()}
                value={option.id.toLowerCase()}
              >
                {option.title}
              </MenuItem>
            ))}
          </TextField>

          <br />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateUser);
