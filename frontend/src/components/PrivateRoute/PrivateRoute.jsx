import { Navigate, Route } from "react-router";
import { useProduct } from "../../contexts";

function PrivateRoute({ path, element }) {
  const { token } = useProduct();
  return (
    <>
      {token ? (
        <Route element={element} path={path} />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
