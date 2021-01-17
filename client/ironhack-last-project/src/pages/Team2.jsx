import React, { Component } from "react";
import ApiHandler from "../api/apiHandler";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddUserToTeam from "../components/Dialogs/AddUserToTeam";
import Teamcreate from "../components/Dialogs/Teamcreate";

export default class Team2 extends Component {
  state = {
    datafiltered: [],
    data_team: [],
    data_test: [],
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
    ApiHandler.get("/api/user")
      .then((apiResponse) => {
        const data_user = apiResponse.data;

        const datafiltered = data_user.filter((e) => e.team.length === 0);

        this.setState({
          datafiltered,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addUser = (item) => {
    this.setState({ data_team: item });
  };

  UpdateUser = (item) => {
    const datafiltered = item.filter((e) => e.team.length === 0);
    this.setState({ datafiltered: datafiltered });
  };

  addTeam = (item) => {
    this.setState({ data_team: [...this.state.data_team, item] });
  };

  handleDelete = (teamId) => {
    const data_team = [...this.state.data_team].filter(
      (item) => item._id !== teamId
    );

    this.setState({ data_team });
    ApiHandler.delete(`/api/team/${teamId}`)

      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  //Handle submit for adding user to a specific team
  AddUserSubmit = (event) => {
    event.preventDefault();
    const data = {
      team_Id: this.state.team,
      user_Id: this.state.user,
    };
    ApiHandler.post("/api/team/add", data)
      .then((apiResponse) => {
        this.setState({
          data_team: apiResponse.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    ApiHandler.get("/api/user")
      .then((apiResponse) => {
        const datafiltered = apiResponse.data.filter(
          (e) => e.team.length === 0
        );
        this.setState({ datafiltered: datafiltered });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      open: false,
    });
  };

  TeamCreateSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    ApiHandler.post("/api/team", this.state)
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

    this.setState({ [key]: value });
  };

  render() {
    return (
      <div>
        <h1>Team Management Page</h1>
        <Teamcreate
          addTeam={this.addTeam}
          handleChange={this.handleChange}
          handleSubmit={this.TeamCreateSubmit}
        ></Teamcreate>
        <AddUserToTeam
          dataFiltered={this.state.datafiltered}
          dataTeam={this.state.data_team}
          addUser={this.addUser}
          UpdateUser={this.UpdateUser}
          handleAddUserSubmit={this.AddUserSubmit}
          handleChange={this.handleChange}
        />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {this.state.data_team.map((data, index) => (
            <React.Fragment>
              <div
                style={{
                  marginTop: "40px",
                  border: "1px solid",
                  padding: "30px",
                  borderRadius: "20px",
                  borderColor: `${data.name.toLowerCase()}`,
                }}
              >
                <h3>
                  <ul key={data._id} style={{ listStyleType: "none" }}>
                    {data.name}{" "}
                  </ul>
                </h3>
                {data.userId.map((element) => (
                  <li
                    key={element._id}
                    id={element._id}
                    style={{ listStyleType: "none" }}
                  >
                    {element.firstName}
                  </li>
                ))}
                <IconButton aria-label="Update">
                  <UpdateIcon fontSize="small" key={`updateButton${index}`} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => this.handleDelete(data._id)}
                >
                  <DeleteIcon key={`delButton${index}`} />
                </IconButton>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
