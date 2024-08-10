import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import "./Header.css";

const Header = () => {
  // Access the currentUser from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  return (
    <header className="header-container">
      <nav className="nav-container">
        {/* Navigation links */}
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {/* Conditionally render user info or login/register link */}
        {currentUser ? (
          <div className="user-info">
            <span>Welcome, {currentUser.username}</span>
            {/* Button to logout and dispatch logout action */}
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        ) : (
          <Link to="/auth">Login/Register</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
