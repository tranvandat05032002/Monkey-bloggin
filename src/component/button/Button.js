import { LoadingSniper } from "component/loading";
import React from "react";
import styled from "styled-components";
const ButtonStyles = styled.button`
  border: none;
  outline: none;
  padding: 0px 25px;
  color: white;
  background-color: ${(props) => props.theme.primary};
  font-weight: 600;
  width: 100%;
  line-height: 1;
  height: ${(props) => props.height || "52px"};
  border-radius: 8px;
  font-size: 16px;
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
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSniper></LoadingSniper> : children;
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
