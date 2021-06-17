import React, { useEffect, useState } from "react";
import { useProduct } from "../../contexts";
import { getUserDetails } from "../../server";
import "./Avatar.css";

function Avatar() {
  const {
    logoutUser,
    state: { firstname, lastname },
    token,
    dispatch,
  } = useProduct();
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    token && getUserDetails(dispatch);
  }, [token, dispatch]);

  return (
    <>
      {token && (
        <div>
          <div onClick={handleShowMenu} className="nav--link text--gray">
            <img
              loading="lazy"
              className="img--xs"
              src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&rounded=true&background=fd7014&color=fff&size=32`}
              alt=""
            />
          </div>
          <div className={`${showMenu ? "menu__container" : ""}`}>
            {showMenu && (
              <div
                tabIndex="-1"
                role="menu"
                className={`${
                  showMenu ? "menu--show" : "menu--hide"
                } menu__item`}
              >
                <button
                  type="button"
                  className="menu__button"
                  onClick={logoutUser}
                  tabIndex={`${showMenu ? "0" : "-1"}`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Avatar;
