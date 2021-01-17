import React from "react";
import Teamcreate from "../components/Dialogs/Teamcreate";
import AddUserToTeam from "../components/Dialogs/AddUserToTeam";
import ApiHandler from "../api/apiHandler";
import TeamFetcher from "../components/TeamFetcher";

class Team extends React.Component {
  state = {
    datafiltered: [],
    data_team: [],
  };
  componentDidMount() {
    ApiHandler.get("/api/user")
      .then((apiResponse) => {
        const data_user = apiResponse.data;
        console.log("datauser ======>", data_user);
        const datafiltered = data_user.filter((e) => e.team.length === 0);
        console.log("data filtré =====>", datafiltered);
        this.setState({
          datafiltered,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });

    ApiHandler.get("/api/team")
      .then((apiResponse) => {
        const data_team = apiResponse.data;
        this.setState({
          data_team,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Team Management Page</h1>
        <Teamcreate />
        <AddUserToTeam
          dataFiltered={this.state.datafiltered}
          dataTeam={this.state.data_team}
        />
        <TeamFetcher />
      </div>
    );
  }
}

export default Team;
