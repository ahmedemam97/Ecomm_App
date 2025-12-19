import { Link } from "react-router-dom";
import AppLogo from "../../Assets/images/freshcart-logo.svg";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container">
        <Link className="navbar-brand" to="">
          <img src={AppLogo} alt="Fresh Cart Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">
                Brands
              </Link>
            </li>
          </ul>

          <ul className="ms-auto navbar-nav">
            <li className=" d-flex align-items-center gap-3 me-2">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
