import React from "react";
import styled, { css } from "styled-components";
const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `}
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
`;

const PostCategory = ({ className, type = "primary", children }) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      {children}
    </PostCategoryStyles>
  );
};

export default PostCategory;
