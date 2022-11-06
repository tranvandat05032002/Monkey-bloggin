import { LoadingSniper } from "component/loading";
import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
const ButtonStyles = styled.button`
  border: none;
  outline: none;
  padding: 0px 25px;
  background-color: ${(props) => props.theme.primary};
  ${(props) =>
    props.kind === "LinePrimary" &&
    css`
      background-color: white;
      border: 1px solid ${(props) => props.theme.primary};
      color: ${(props) => props.theme.primary};
    `}
  ${(props) =>
    props.kind === "LineSecondary" &&
    css`
      background-color: white;
      border: 1px solid ${(props) => props.theme.secondary};
      color: ${(props) => props.theme.secondary};
    `}
    ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.primary};
    `};
  font-weight: 500;
  width: 100%;
  line-height: 1;
  height: ${(props) => props.height || "52px"};
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSniper></LoadingSniper> : children;
  let ButtonElement = "div";
  to ? (ButtonElement = NavLink) : (ButtonElement = "div");
  return (
    <ButtonElement to={to}>
      <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
        {child}
      </ButtonStyles>
    </ButtonElement>
  );
};
Button.propsTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
