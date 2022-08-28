import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text--center">
      <div>
        <div className="h6 text--bold spacing">
          Oops! This is not the web page you are looking for.
        </div>
        <div>
          <Link to="/">
            <button className="button button--primary button--sm text--white subtitle--sm">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
