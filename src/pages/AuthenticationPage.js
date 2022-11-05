import React from "react";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0px auto;
  }
  .have-account {
    margin-bottom: 20px;
    font-size: 12px;
    margin-top: -14px;
    text-align: start;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img alt="monkey-blogging" srcSet="/logo.png 2x" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
