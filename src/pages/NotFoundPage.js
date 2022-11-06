import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
const NotFoundPageStyles = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  .link-home {
    position: absolute;
    content: "";
    top: 65%;
    left: 46.5%;
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    padding: 5px;
  }
`;

const NotFoundPage = () => {
  React.useEffect(() => {
    document.title = "Not Found";
  }, []);
  return (
    <NotFoundPageStyles>
      <div className="not-found">
        <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
        <NavLink to="/" className="link-home">
          Go Home
        </NavLink>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
