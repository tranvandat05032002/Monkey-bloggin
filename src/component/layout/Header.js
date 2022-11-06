import {
  ButtonPrimary,
  LineButtonPrimary,
  LineButtonSecondary,
} from "component/button";
import { useAuth } from "context/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0px;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }
  /* .header-right {
    margin-left: auto;
  } */
  .search {
    margin-left: auto;
    padding: 10px 15px;
    border: 1px solid #9999;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    padding-right: 30px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    right: 15px;
  }
  .header-auth {
    gap: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
`;

function geLastName(newName) {
  if (!newName) return "";
  const length = newName.split(" ").length;
  return newName.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <>
              <LineButtonSecondary
                type="button"
                className="header-button max-w-[115px] ml-5"
                height="46px"
                to="/sign-in"
              >
                Sign In
              </LineButtonSecondary>
              <LineButtonPrimary
                type="button"
                className="header-button max-w-[115px] ml-5"
                height="46px"
                to="/sign-up"
              >
                Sign Up
              </LineButtonPrimary>
            </>
          ) : (
            <>
              <div className="header-auth">
                <strong>{geLastName(userInfo?.displayName)}</strong>
                <ButtonPrimary
                  type="button"
                  className="header-button max-w-[115px] ml-5"
                  height="46px"
                  to="/sign-in"
                >
                  Log out
                </ButtonPrimary>
              </div>
            </>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
