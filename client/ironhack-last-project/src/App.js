import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Team from "./pages/Team";
import EditUser from "./pages/EditUser";
import SchedulerView from "./pages/SchedulerView";
import FormAddEvent from "./components/Forms/FormAddEvent";
import deleteEventView from "./pages/deleteEventView";
function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user" component={User} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/test" component={FormAddEvent} />
        <Route exact path="/scheduler" component={SchedulerView} />
        <Route exact path="/user/edit/:id" component={EditUser} />
        <Route exact path="/event/delete/:id" component={deleteEventView} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
