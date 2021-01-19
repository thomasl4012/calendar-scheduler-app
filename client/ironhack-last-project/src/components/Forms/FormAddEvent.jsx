import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";

export default class FormAddEvent extends Component {
  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  render() {
    return (
      <div>
        <form onChange={this.onChange} onSubmit={this.props.onSubmit}>
          <TextField
            id="outlined-select-currency"
            label="Title"
            type="text"
            variant="outlined"
            name="title"
            onChange={this.onChange}
          />
          <br />

          <TextField
            id="datetime-local"
            label="start date"
            type="datetime-local"
            onChange={this.onChange}
            defaultValue={"2020-01-19T10:30"}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            id="datetime-local"
            label="End date"
            type="datetime-local"
            onChange={this.props.onChange}
            defaultValue={"2020-01-19T10:30"}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>add</Icon>}
          >
            Add
          </Button>
        </form>
      </div>
    );
  }
}
