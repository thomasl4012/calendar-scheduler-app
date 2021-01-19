import React, { Component } from "react";
import ApiHandler from "../api/apiHandler";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddUserToTeam from "../components/Dialogs/AddUserToTeam";
import Teamcreate from "../components/Dialogs/Teamcreate";
import axios from "axios";

export default class Team extends Component {
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

  handleDelete = (teamId) => {
    // remove the card on the front logic
    const data_team = [...this.state.data_team].filter(
      (item) => item.id !== teamId
    );
    //Delete the team in the back
    this.setState({ data_team });
    ApiHandler.delete(`/api/team/${teamId}`);

    ApiHandler.get("/api/user").then((res) => {
      console.log("result2 from delete===>", res);

      const datafiltered = res.data.filter((e) => e.team.length === 0);

      console.log("datafiltered from delete===>", datafiltered);
      this.setState({
        datafiltered: datafiltered,
      });
    }); //Fetch the users back again to make them selectable again
  };

  //Handle submit for adding user to a specific team
  AddUserSubmit = async (event) => {
    event.preventDefault();
    const data = {
      team_Id: this.state.team,
      user_Id: this.state.user,
    };
    await axios
      .all([
        ApiHandler.post("/api/team/add", data),
        ApiHandler.get("/api/user"),
      ])
      .then(
        axios.spread((result1, result2) => {
          console.log("result1 ==>", result1.data, "result2 ==>", result2.data);
          const datafiltered = result2.data.filter((e) => e.team.length === 0);
          console.log(datafiltered);
          this.setState({
            datafiltered: datafiltered,
            data_team: result1.data,
          });
        })
      )
      .catch((error) => {
        console.log(error);
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
                  <ul key={data.id} style={{ listStyleType: "none" }}>
                    {data.name}{" "}
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
                <IconButton aria-label="Update">
                  <UpdateIcon fontSize="small" key={`updateButton${index}`} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => this.handleDelete(data.id)}
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
