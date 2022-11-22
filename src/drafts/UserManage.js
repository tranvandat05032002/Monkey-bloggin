import { Button } from "component";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Create user
        </Button>
      </DashboardHeading>
    </div>
  );
};

export default UserManage;
