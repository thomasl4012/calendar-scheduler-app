import React, { Component } from "react";
import ApiHandler from "../api/apiHandler";
import UpdateIcon from "@material-ui/icons/Update";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
export default class TeamFetcher extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    //get all available team
    ApiHandler.get("/api/team/users")
      .then((apiResponse) => {
        const data = apiResponse.data;
        console.log(data);
        this.setState({
          data,
        });
        //console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (teamId) => {
    const data = [...this.state.data].filter((item) => item._id !== teamId);
    console.log(data);
    this.setState({ data });
    ApiHandler.delete(`/api/team/${teamId}`)

      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {this.state.data.map((data, index) => (
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
    );
  }
}
