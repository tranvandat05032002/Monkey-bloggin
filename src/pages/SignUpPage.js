import React from "react";
import styled from "styled-components";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  .label {
    color: ${(props) => props.theme.grayDark};
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .input {
    width: 100%;
    padding: 17px 20px;
    border: none;
    outline: none;
    border-radius: 8px;
    border: 1px solid #999999;
    font-weight: 500;
    transition: all 0.2s linear;
  }
  .input::-webkit-input-placeholder {
    color: ${(props) => props.theme.grayPlaceholder};
  }
  .input::-moz-input-placeholder {
    color: ${(props) => props.theme.grayPlaceholder};
  }
  .input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .form {
    max-width: 600px;
    margin: 0px auto;
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyles>
      <div className="container">
        <img alt="monkey-blogging" srcSet="/logo.png 2x" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="form">
          <div className="field">
            <label htmlFor="fullName" className="label">
              Fullname
            </label>
            <input
              id="fullName"
              type="text"
              className="input"
              placeholder="Enter your fullname"
            />
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
