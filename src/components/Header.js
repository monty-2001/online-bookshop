import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <header className="main-head">
      <nav>
        <h1 id="logo">
          <Link to="/">E-COMMERCE</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {isAuthenticated ? (
            <div>
              <li>
                <p>{user.name}</p>
              </li>
            </div>
          ) : (
            <li>
              <LoginButton></LoginButton>
            </li>
          )}
          <li>
            <LogoutButton></LogoutButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
