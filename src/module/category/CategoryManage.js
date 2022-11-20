import { Button, Table } from "component";
import { ActionDelete, ActionEdit, ActionView } from "component/action";
import { LabelStatus } from "component/label";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus, CATEGORY_PER_PAGE, userStatus } from "utils/constans";

const CategoryManage = () => {
  const [categoryList, setCategoryList] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [lastDoc, setLastDoc] = React.useState();
  const [total, setTotal] = React.useState(0);
  const handleFilterValues = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const navigate = useNavigate();
  //Load more data
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );

    onSnapshot(nextRef, (snapShot) => {
      let cities = [];
      snapShot.forEach((doc) => {
        cities.push({
          id: doc.id,
          ...doc?.data(),
        });
      });
      setCategoryList([...categoryList, ...cities]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  //Search data
  React.useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapShotSize) => {
        setTotal(snapShotSize.size);
      });
      onSnapshot(newRef, (snapShot) => {
        let cities = [];
        snapShot.forEach((doc) => {
          cities.push({
            id: doc.id,
            ...doc?.data(),
          });
        });
        setCategoryList(cities);
      });
      setLastDoc(lastVisible);
    };
    fetchData();
  }, [filter]);
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
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-sm outline-none focus-within:border-green-300"
          onChange={handleFilterValues}
        />
      </div>
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
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
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
      {total > categoryList.length && (
        <div className="mt-10">
          <Button
            kind="ghost"
            className="mx-auto"
            onClick={handleLoadMoreCategory}
          >
            See more+
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
