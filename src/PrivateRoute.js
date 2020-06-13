// FOR SPECIFYING A PRIVATE ROUTE
// ONLY AUTHENTICATED USER CAN ACCESS PRIVATE ROUTE
// IF USER ISN'T AUTHENTICATED, THEY WILL BE REDIRECTED TO LOGIN

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/Login"} />
        )
      }
    />
  );
};


export default PrivateRoute