import React from "react";
import { withUser } from "../components/Auth/withUser.jsx";
const Profile = (props) => {
  return <div>{<h1>Welcome {props.context.user.firstName}</h1>}</div>;
};

export default withUser(Profile);
