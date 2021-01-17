import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import ApiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";

class FormTeamCreate extends Component {
  render() {
    return (
      <div>
        <form
          onChange={this.props.handleChange}
          onSubmit={this.props.handleSubmit}
        >
          <TextField
            id="outlined-text-input"
            label="Team name"
            type="text"
            autoComplete="current-password"
            variant="outlined"
            name="name"
          />
          <br />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
          >
            Create Team
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormTeamCreate);
