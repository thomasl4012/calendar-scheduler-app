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

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

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
