import React from "react";
import { NavLink } from "react-router-dom";
import { getFilteredMenuList, menuList } from "../../utils";

function DesktopMenu({ token, handleSideMenuClick }) {
  return (
    <>
      <div className="showNav">
        <ul className="list--inline li--border flex--row">
          {getFilteredMenuList(menuList, token).map(({ name, path }) => (
            <li key={name} className="list__item  li--border spacing--sm">
              <NavLink
                end
                onClick={handleSideMenuClick}
                to={`${path}`}
                className="active"
              >
                <span className="subtitle--sm">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DesktopMenu;
