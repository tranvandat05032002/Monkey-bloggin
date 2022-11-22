import { Table } from "component";
import { ActionDelete, ActionEdit } from "component/action";
import { LabelStatus } from "component/label";
import { db } from "firebase-app/firebase-config";
import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constans";

const UserTable = () => {
  const [userList, setUserList] = React.useState([]);
  const navigate = useNavigate();
  const [valueFilter, setValueFilter] = React.useState("");
  React.useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapShot) => {
      const cities = [];
      snapShot.forEach((doc) => {
        cities.push({
          id: doc.id,
          ...doc?.data(),
        });
      });
      setUserList(cities);
    });
  }, []);

  //Label status
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  //Label Role
  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Mod";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };

  //handle Delete user
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    console.log(1212);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        await deleteUser(user);
        toast.success("Delete successfully");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  //handle filter user
  const handleFilterUser = debounce((e) => {
    setValueFilter(e.target.value);
  }, 500);
  console.log(valueFilter);
  //search user
  React.useEffect(() => {
    const colRef = collection(db, "users");
    const newRef = valueFilter
      ? query(
          colRef,
          where("fullName", ">=", valueFilter),
          where("fullName", "<=", valueFilter + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapShot) => {
      const cities = [];
      snapShot.forEach((doc) => {
        cities.push({
          id: doc.id,
          ...doc?.data(),
        });
      });
      setUserList(cities);
    });
  }, [valueFilter]);
  // console.log(valueFilter);

  //Render userItem
  const RenderUserItem = (user) => {
    const format = new Date(user?.createAt?.seconds * 1000).toLocaleDateString(
      "vi-VI"
    );
    return (
      <tr key={user.id}>
        <td title={user.id}>{user?.id.substr(0, 3) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={
                user?.avatar ||
                "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-9.jpg"
              }
              alt=""
              className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
            />
            <div className="flex-1">
              <h3>{user?.fullName || "Hạ My"}</h3>
              <time className="text-sm text-gray-300">{format}</time>
            </div>
          </div>
        </td>
        <td>{user?.username || "Hạ My"}</td>
        <td title={user.email}>{user?.email.substr(0, 5) + "..."}</td>
        <td>{renderLabelStatus(Number(user?.status) || 3)}</td>
        <td>{renderLabelRole(Number(user?.role) || 2)}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() => {
                navigate(`/manage/update-user?id=${user.id}`);
              }}
            ></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <div className="flex justify-end w-full mb-10">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-sm outline-none"
          placeholder="Search User"
          onChange={handleFilterUser}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => RenderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
