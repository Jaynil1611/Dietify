import { Navigate } from "react-router";
import { useProduct } from "../../contexts";

function PrivateRoute({ children }) {
  const { token } = useProduct();
  return <>{token ? children : <Navigate replace to="/login" />}</>;
}

export default PrivateRoute;
