import { Link } from "react-router-dom";
import { useProduct } from "../../contexts";
import { Avatar, DesktopMenu } from "../index";

function Header({ showMenu, handleSideMenuClick, token }) {
  const {
    state: { wishList, cartList },
  } = useProduct();
  return (
    <div className="heading">
      <div className="mobile-menu" onClick={handleSideMenuClick}>
        {showMenu ? (
          <i className="fas fa-times fa-lg spacing--horiz"></i>
        ) : (
          <i className="fas fa-bars fa-lg spacing--horiz"></i>
        )}
      </div>
      <h1 className="heading__name">
        <Link to="/">Dietify</Link>
      </h1>
      <DesktopMenu token={token} handleSideMenuClick={handleSideMenuClick} />
      {token && (
        <nav className="nav--right">
          <ul className="nav">
            <li className="width--4">
              <Link
                className="nav--link text--gray badge__container"
                to="/wish"
              >
                <i className="fas fa-heart fa-lg">
                  <span className="badge__icon text--white badge__icon badge--overlay">
                    {wishList.length}
                  </span>
                </i>
              </Link>
            </li>
            <li className="width--4">
              <Link
                className="nav--link text--gray badge__container"
                to="/cart"
              >
                <i className="fas fa-shopping-cart fa-lg">
                  <span className="badge__icon text--white badge__icon badge--overlay">
                    {cartList.length}
                  </span>
                </i>
              </Link>
            </li>
            <li className="width--4">
              <Avatar />
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Header;
