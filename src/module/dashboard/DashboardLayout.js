import { useAuth } from "context/auth-context";
import NotFoundPage from "pages/NotFoundPage";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
  }
`;
const DashboardLayout = () => {
  const { userInfo } = useAuth();
  console.log(
    "🚀 ~ file: DashboardLayout.js ~ line 30 ~ DashboardLayout ~ userInfo",
    userInfo
  );
  if (!userInfo.uid) return <NotFoundPage></NotFoundPage>;
  console.log(
    "🚀 ~ file: DashboardLayout.js ~ line 35 ~ DashboardLayout ~ userInfo",
    userInfo
  );
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
