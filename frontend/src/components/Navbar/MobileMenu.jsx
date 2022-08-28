import React from "react";
import { NavLink } from "react-router-dom";
import { getFilteredMenuList, menuList } from "../../utils";

function MobileMenu({ showMenu, token, handleSideMenuClick }) {
  return (
    <>
      <div className={`side-bar ${showMenu ? "show" : ""}`}>
        <div className={`side-menu ${showMenu ? "view" : ""}`}>
          <ul className="list__group li--border sidebar--scroll">
            {getFilteredMenuList(menuList, token).map(
              ({ name, icon, path }) => (
                <li key={name} className="list__item li--border spacing--sm">
                  <NavLink
                    end
                    onClick={handleSideMenuClick}
                    to={`${path}`}
                    className="active"
                  >
                    <span className="padding--right-md">
                      <i className={`fas ${icon} icon--md`}></i>
                    </span>
                    <span className="subtitle--sm">{name}</span>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
