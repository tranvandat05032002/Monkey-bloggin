import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: ${(props) =>
      props.hasIcon ? "calc(100% - calc(60px + 20px))" : "calc(100% - 40px)"};
    max-width: 600px;
    padding: ${(props) =>
      props.hasIcon ? "16px 60px 16px 20px" : "17px 20px;"};
    border: none;
    outline: none;
    border-radius: 8px;
    border: 1px solid #999999;
    font-weight: 500;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-style: 14px;
  }
  input::-webkit-input-placeholder {
    color: ${(props) => props.theme.grayPlaceholder};
  }
  input::-moz-input-placeholder {
    color: ${(props) => props.theme.grayPlaceholder};
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  .input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    cursor: pointer;
  }
`;

const Input = ({ name, type = "text", children, control, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  );
};

export default Input;
