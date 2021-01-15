import React from "react";
import ApiHandler from "../../api/apiHandler";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';

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

class FormEditUser extends React.Component {
  state = [];
 
  componentDidMount() {
      
    const userId = this.props.id;

    ApiHandler
      .get("/api/user/" + userId)
      .then((apiResponse) => {
          console.log(apiResponse);
        const user = apiResponse.data;
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          team: user.team,
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

    ApiHandler
      .patch("/api/user/" + userId, {
       firstName: this.state.firstName,
       lastName: this.state.lastName,
       team: this.state.team,
      })
      .then((apiResponse) => {
        this.props.push("/user");
        // console.log(apiResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <h2 style={{marginBottom:"30px"}}>Edit a user </h2>
  <TextField
          id="standard-basic"
          label="First Name"
          type="text"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="firstName"
          value={this.state.firstName}
        > {this.state.firstName}</TextField>
        <br/>
     <TextField
          id="standard-basic"
          label="Last name"
          type="text"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="lastName"
          value={this.state.lastName}
        > {this.state.lastName}</TextField>
        <br/>
       <TextField
       id="outlined-select-currency"
          label="Choose your team"
          select
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="team"
          value={this.state.team}
           onChange={this.handleChange}
          

        >
        {team.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

</TextField>
<br/>
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
