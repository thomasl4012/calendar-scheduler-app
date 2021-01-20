import React from "react";
import ApiHandler from "../../api/apiHandler";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

class FormEditUser extends React.Component {
  state = {};

  componentDidMount() {
    const userId = this.props.id;

    ApiHandler.get("/api/user/" + userId)
      .then((apiResponse) => {
        console.log(apiResponse);
        const user = apiResponse.data;
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const userId = this.props.id;

    ApiHandler.patch("/api/user/" + userId, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      team: this.state.team,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <h2 style={{ marginBottom: "30px" }}>Edit a user </h2>
        <TextField
          id="standard-basic"
          label="First Name"
          type="text"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="firstName"
          value={this.state.firstName}
        >
          {" "}
          {this.state.firstName}
        </TextField>
        <br />
        <TextField
          id="standard-basic"
          label="Last name"
          type="text"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="lastName"
          value={this.state.lastName}
        >
          {" "}
          {this.state.lastName}
        </TextField>
        <br />
        <TextField
          id="standard-basic"
          label="Last name"
          type="text"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="lastName"
          value={this.state.email}
        >
          {" "}
          {this.state.email}
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
    );
  }
}

export default FormEditUser;
