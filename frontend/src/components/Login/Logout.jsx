import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../../contexts";
import { useDocumentTitle } from "../../utils";

function Logout() {
  const { logoutUser } = useProduct();
  const navigate = useNavigate();
  useDocumentTitle("Logout");

  useEffect(() => {
    logoutUser();
    navigate("/");
  }, []);

  return (
    <>
      <div className="text--center spacing text--gray">
        You are being logged out!
      </div>
      <div>
        <span className="loading"></span>
      </div>
    </>
  );
}

export default Logout;
