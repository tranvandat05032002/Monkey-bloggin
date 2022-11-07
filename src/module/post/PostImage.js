import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const ImageStyles = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
  return (
    <NavLink to={to}>
      <ImageStyles src={url} alt={alt} className={`post-image ${className}`} />
    </NavLink>
  );
};

export default PostImage;
