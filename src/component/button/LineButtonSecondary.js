import { LoadingSniper } from "component/loading";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const ButtonStyles = styled.button`
  border: none;
  outline: none;
  padding: 0px 25px;
  color: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.secondary};
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

const LineButtonSecondary = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSniper></LoadingSniper> : children;
  let ButtonElement = "div";
  to ? (ButtonElement = NavLink) : (ButtonElement = "div");
  // if(to){
  //   Button
  // }
  return (
    <ButtonElement to={to}>
      <ButtonStyles type={type} onClick={onClick} {...props}>
        {child}
      </ButtonStyles>
    </ButtonElement>
  );
};

export default LineButtonSecondary;
