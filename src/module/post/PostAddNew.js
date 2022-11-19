import React from "react";
import { useForm } from "react-hook-form";
import { postStatus } from "utils/constans";
import ImageUpload from "component/image/ImageUpload";
import {
  Button,
  Field,
  Input,
  Label,
  Radio,
  Toggle,
  FieldCheckboxes,
} from "component";
import useFirebaseImage from "hooks/useFirebaseImage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { Dropdown } from "component/dropdown";
import slugify from "slugify";
import { useAuth } from "context/auth-context";
import { toast } from "react-toastify";
import DashboardHeading from "module/dashboard/DashboardHeading";

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryID: "",
      hot: false,
      image: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");

  // const watchCategory = watch("category");
  const [category, setCategory] = React.useState([]);
  const [selectCategory, setSelectCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const {
    handleSelectImage,
    image,
    progress,
    handleResetUpload,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  React.useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(result);
    }
    getData();
  }, []);
  const handleClickOption = (item) => {
    setValue("categoryID", item.id);
    setSelectCategory(item);
  };
  const { userInfo } = useAuth();
  React.useEffect(() => {
    document.title = "Add-post";
  }, []);
  const addPostHandle = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, {
        lower: true,
      });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userID: userInfo.uid,
        createAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        categoryID: "",
        hot: false,
        image: "",
      });
      setLoading(false);
      handleResetUpload();
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandle)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name={"image"}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className={"h-[250px]"}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`Please select an option` || selectCategory.name}
              ></Dropdown.Select>
              <Dropdown.List>
                {category.length > 0 &&
                  category.map((item) => (
                    <Dropdown.Option
                      onClick={() => handleClickOption(item)}
                      key={item.id}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg cursor-pointer bg-green-50">
                {selectCategory.name}
              </span>
            )}
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={2}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                // onClick={() => setValue("status", "reject")}
                value={3}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          isLoading={loading}
          disabled={loading}
          type="submit"
          className="mx-auto max-w-[200px]"
        >
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
