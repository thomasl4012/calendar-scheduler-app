import React, { Component } from "react";
import ApiHandler from "../api/apiHandler";

import DeleteIcon from "@material-ui/icons/Delete";
import AddUserToTeam from "../components/Dialogs/AddUserToTeam";
import Teamcreate from "../components/Dialogs/Teamcreate";

import SearchBar from "../components/SearchBar";
import EditTeam from "../components/Dialogs/EditTeam";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

export default class Team extends Component {
  state = {
    datafiltered: [],
    data_team: [],
    previousTeamid: "",
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

  handleDelete = (teamId) => {
    // remove the card on the front logic
    const data_team = [...this.state.data_team].filter(
      (item) => item.id !== teamId
    );
    //Delete the team in the back
    this.setState({ data_team });

    ApiHandler.delete(`/api/team/${teamId}`)
      .then((res) => {
        console.log("step1 ===>", res);
        ApiHandler.get("/api/user").then((res2) => {
          if (res2.status === 200) {
            console.log("res2 ===>", res2);
            const datafiltered = res2.data.filter((e) => e.team.length === 0);

            console.log("datafiltered from delete===>", datafiltered);
            this.setState({
              datafiltered: datafiltered,
            });
          } else {
            window.location.reload();
          }
        });
      })
      .catch((reason) => {
        console.log(reason);
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
      .then((result1) => {
        console.log(result1);
        this.setState({
          data_team: result1.data,
        });
        ApiHandler.get("/api/user").then((result2) => {
          const datafiltered = result2.data.filter((e) => e.team.length === 0);
          console.log(datafiltered);
          this.setState({
            datafiltered: datafiltered,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSearch = (event) => {
    const value = event.target.value;
    let filteredList = [];
    filteredList = [...this.state.data_team].filter((e) => {
      return e.title.toLowerCase().includes(value.toLowerCase());
    });

    this.setState({
      data_team: filteredList,
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

  handleUpdate = (event) => {
    event.preventDefault();
    ApiHandler.patch("/api/team/update", {
      teamId: this.state.teamId,
      userId: this.state.userId,
      // previousTeamId: infos.event.end,
    })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Team Management Page</h1>
        <div>
          <ul
            style={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
            }}
          >
            <React.Fragment>
              <li style={{ margin: "10px" }}>
                <Teamcreate
                  addTeam={this.addTeam}
                  handleChange={this.handleChange}
                  handleSubmit={this.TeamCreateSubmit}
                ></Teamcreate>
              </li>
              <li style={{ margin: "10px" }}>
                <AddUserToTeam
                  dataFiltered={this.state.datafiltered}
                  dataTeam={this.state.data_team}
                  addUser={this.addUser}
                  handleAddUserSubmit={this.AddUserSubmit}
                  handleChange={this.handleChange}
                />
              </li>
              <li>
                <SearchBar onSearch={this.handleSearch} />
              </li>
            </React.Fragment>
          </ul>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {this.state.data_team.map((data, index) => (
            <React.Fragment>
              <div
                style={{
                  marginTop: "40px",
                  border: "1px solid",
                  paddingTop: "25px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  borderRadius: "20px",
                  borderColor: `${data.title.toLowerCase()}`,
                }}
              >
                <h3>
                  <ul key={data.id} style={{ listStyleType: "none" }}>
                    {data.title}{" "}
                  </ul>
                </h3>
                {data.userId.map((element) => (
                  <li
                    key={element.id}
                    id={element.id}
                    style={{ listStyleType: "none" }}
                  >
                    {element.firstName}
                  </li>
                ))}
                <br />

                <EditTeam
                  data={this.state}
                  onChange={this.handleChange}
                  onSubmit={this.handleUpdate}
                  teamId={data.id}
                />
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.handleDelete(data.id)}
                  endIcon={
                    <Icon>
                      <DeleteIcon></DeleteIcon>
                    </Icon>
                  }
                >
                  Delete
                </Button>
                <br />
                <br />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
