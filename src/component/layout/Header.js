import React from "react";
import styled from "styled-components";
const HeaderStyles = styled.div``;

const Header = () => {
  return (
    <HeaderStyles>
      <a href="/">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" />
      </a>
    </HeaderStyles>
  );
};

export default Header;
