import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import ApiHandler from "../../api/apiHandler";
import moment from "moment";

export default class FormAddEvent extends Component {
  state = {
    data_team: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    ApiHandler.post("/api/event/create", this.state)
      .then((data) => {
        console.log(data.data);
        this.setState({ data_team: [...this.state.data_team, data.data] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    const color = event.currentTarget.getAttribute("data-set");
    this.setState({ color: color });
    this.setState({ [key]: value });
  };

  componentDidMount() {
    //get all available team
    ApiHandler.get("/api/team/users")
      .then((apiResponse) => {
        const data_team = apiResponse.data;
        this.setState({
          data_team,
        });
        //console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleHiddenData = () => {
    const result = this.state.data_team.filter(
      (e) => e.id === this.state.resourceId
    );

    console.log(result);
    if (result.length > 0) {
      this.setState({ color: result[0].title });
    }
  };

  handleHiddenField = () => {
    if (this.state.data_team.ressource_id != null) {
      return this.state.data_team.map((option) => (
        <input
          id="prodId"
          name="color"
          type="hidden"
          onChange={this.handleChange}
          value={option.title.toLowerCase()}
        ></input>
      ));
    }
  };

  render() {
    return (
      <div>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <TextField
            id="outlined-select-currency"
            label="Title"
            type="text"
            variant="outlined"
            name="title"
            onChange={this.handleChange}
          />
          <br />

          <TextField
            id="datetime-local"
            label="start date"
            type="datetime-local"
            name="start"
            onChange={this.handleChange}
            defaultValue={moment()}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            id="datetime-local"
            label="End date"
            name="end"
            type="datetime-local"
            onChange={this.handleChange}
            defaultValue={moment()}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <br />
          <br />

          <TextField
            id="outlined-select-currency"
            label="Choose a team"
            select
            variant="outlined"
            name="resourceId"
            onChange={this.handleChange}
            onClick={this.handleHiddenData}
          >
            {this.state.data_team.map((option) => (
              <MenuItem
                key={option.title.toLowerCase()}
                value={option.id.toLowerCase()}
                data-set={option.title}
              >
                {option.title}
              </MenuItem>
            ))}
          </TextField>

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
