import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import ApiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Joi from "joi-browser";

class FormCreateUser extends Component {
  static contextType = UserContext;

  state = {
    data: [],
    account: {
      team: "",

      firstName: "",
      lastName: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().required().label("First name"),
    lastName: Joi.string().required().label("Last name"),
    email: Joi.string().email().required().label("Email"),
    team: Joi.string().required().label("Team"),
  };
  validate = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.account, this.schema, options);
    console.log(result);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
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

  validateProperty = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    const obj = { [key]: value };
    const schema = { [key]: this.schema[key] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = (event) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event);
    if (errorMessage) errors[event.target.name] = errorMessage;
    else delete errors[event.target.name];
    const account = { ...this.state.account };

    const value = event.target.value;
    const key = event.target.name;
    account[key] = value;
    this.setState({ account, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
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
            {...(errors.firstName && {
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
            {...(errors.lastName && {
              error: true,
              label: errors.lastName,
              variant: "outlined",
              id: "outlined-error-helper-text",
              defaultValue: errors.lastName,
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
            {...(errors.email && {
              error: true,
              label: errors.email,
              variant: "outlined",
              id: "outlined-error-helper-text",
              defaultValue: errors.email,
            })}
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
            {...(this.validate() && {
              disabled: true,
            })}
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateUser);
