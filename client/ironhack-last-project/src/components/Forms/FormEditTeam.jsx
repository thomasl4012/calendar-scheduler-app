import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
class FormEditTeam extends React.Component {
  state = {};

  render() {
    const teamId = this.props.teamId;
    const teamSelected = this.props.data.data_team.filter(
      (e) => e.id === teamId
    );

    return (
      <div>
        <form onChange={this.props.onChange} onSubmit={this.props.onSubmit}>
          <TextField
            id="outlined-select-text"
            label="Choose a user"
            select
            variant="outlined"
            name="userId"
            onChange={this.props.onChange}
          >
            {teamSelected[0].userId.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.firstName} {option.lastName}
              </MenuItem>
            ))}
          </TextField>
          <br />

          <TextField
            id="outlined-select-text"
            label="Choose your team"
            select
            variant="outlined"
            name="teamId"
            onChange={this.props.onChange}
          >
            {this.props.data.data_team.map((option) => (
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
            Update
          </Button>
        </form>
      </div>
    );
  }
}

export default FormEditTeam;
