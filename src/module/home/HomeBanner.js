import { Button } from "component/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium magnam similique accusantium natus esse facilis!
              Quaerat voluptates possimus dolorem officiis pariatur, repellat,
              cupiditate porro, quidem molestiae impedit laudantium neque quo!
            </p>
            <div className="inline-block">
              <Button to="/sign-in" kind="secondary">
                Get started
              </Button>
            </div>
          </div>
          <div className="banner-image">
            <img src="/img-banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
