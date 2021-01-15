import React from "react";
import FormEditUser from "../components/Forms/FormEditUser";

const EditUser = (props) => {
  return <FormEditUser id={props.match.params.id} push={props.history.push}/>;
};

export default EditUser;
