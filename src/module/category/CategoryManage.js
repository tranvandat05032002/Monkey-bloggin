import { Button, Table } from "component";
import { ActionDelete, ActionEdit, ActionView } from "component/action";
import { LabelStatus } from "component/label";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import Swal from "sweetalert2";
import { categoryStatus } from "utils/constans";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = React.useState([]);
  React.useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapShot) => {
      let cities = [];
      snapShot.forEach((doc) => {
        cities.push({
          id: doc.id,
          ...doc?.data(),
        });
      });
      setCategoryList(cities);
    });
  }, []);

  console.log(categoryList);
  const handleDeleteCategory = async (docID) => {
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
        await deleteDoc(doc(db, "categories", docID));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleDeleteCategory(category.id);
                      }}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
