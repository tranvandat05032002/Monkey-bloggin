import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTitleStyles = styled.h3`
  font-weight: bold;
  line-height: 1.5;
  a {
    display: block;
  }
  color: inherit;
  letter-spacing: 0.25px;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `}
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `}
`;

const PostTitle = ({ children, size = "normal", className = "", to = "/" }) => {
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
