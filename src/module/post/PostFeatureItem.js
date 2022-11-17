import { async } from "@firebase/util";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .meta-setColor {
        color: ${(props) => props.theme.white400};
      }
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = React.useState("");
  const [user, setUser] = React.useState("");
  console.log(data);

  React.useEffect(() => {
    async function fetchCategory() {
      const docRef = doc(db, "categories", data.categoryID);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap?.data());
    }
    fetchCategory();
  }, [data.categoryID]);
  React.useEffect(() => {
    async function fetchUser() {
      if (data.userID) {
        const docRef = doc(db, "users", data.userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.data) {
          setUser(docSnap.data());
        }
      }
    }
    fetchUser();
  }, [data.userID]);
  if (!data || !data.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} alt="unsplash" />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={category?.slug} type="secondary">
            {category.name}
          </PostCategory>
          <PostMeta
            className="meta-setColor"
            authorName={user?.fullName}
            to={slugify(user?.fullName || "", { lower: true })}
          ></PostMeta>
        </div>
        <PostTitle to={data?.slug} size="big">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
