import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../../Assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function NavBar() {
  let { userToken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate();

  function removeToken() {
    console.log('adsfdsfds');

    localStorage.removeItem('userToken');
    setUserToken(null)
    navigate("/login");
  }

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
          {userToken != null ? <>
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

          </>
            : ''}
          <ul className=" d-flex align-items-center gap-3 my-auto list-unstyled ms-auto">
            <li>
              <i className="fab fa-facebook"></i>
            </li>
            <li>
              <i className="fab fa-youtube"></i>
            </li>
            <li>
              <i className="fab fa-twitter"></i>
            </li>
            <li className='list-unstyled'>
              <i className="fab fa-instagram"></i>
            </li>


            {userToken ? < > <li>
              <button
                className="nav-link btn btn-link"
                onClick={removeToken}
              >
                Logout
              </button>
            </li></> : <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav >
  );
}

export default NavBar;
