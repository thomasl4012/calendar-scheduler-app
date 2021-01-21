import React from "react";
import ApiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";

class FormEditEvents extends React.Component {
  state = {};

  // componentDidMount() {
  //   const userId = this.props.id;

  //   ApiHandler.get("/api/user/" + userId)
  //     .then((apiResponse) => {
  //       console.log(apiResponse);
  //       const user = apiResponse.data;
  //       this.setState({
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         email: user.email,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const userId = this.props.id;

  //   ApiHandler.patch("/api/user/" + userId, {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     team: this.state.team,
  //   })
  //     .then(() => {
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  render() {
    return (
      <div>
        <form onChange={this.props.onChange} onSubmit={this.props.onSubmit}>
          <TextField
            id="outlined-text-input"
            label={`The title is : ${this.props.title}`}
            type="text"
            variant="outlined"
            name="title"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.props.onChange}
          />
          <br />

          <TextField
            id="datetime-local"
            label={
              this.props.open &&
              `Start date was: ${this.props.start.substring(0, 19)} `
            }
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            name="start"
            onChange={this.props.onChange}
            defaultValue={this.props.CurrentDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />

          <br />
          <TextField
            id="datetime-local"
            label={
              this.props.open &&
              `Ending date was: ${this.props.end.substring(0, 19)}`
            }
            name="end"
            type="datetime-local"
            onChange={this.props.onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />

          <TextField
            id="outlined-select-currency"
            label={`Team was: ${this.props.defaultValue}`}
            select
            variant="outlined"
            name="resourceId"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.props.onChange}
          >
            {this.props.open &&
              this.props.data_team.map((option) => (
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

          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.props.handleDelete}
            endIcon={
              <Icon>
                <DeleteIcon></DeleteIcon>
              </Icon>
            }
          >
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

export default FormEditEvents;
