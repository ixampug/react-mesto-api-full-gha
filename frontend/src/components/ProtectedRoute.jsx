import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  return props.loggedIn ? props.children : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
