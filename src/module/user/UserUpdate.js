import React from "react";
import {
  Button,
  Radio,
  Input,
  Label,
  Field,
  FieldCheckboxes,
  ImageUpload,
} from "component";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import useFirebaseImage from "hooks/useFirebaseImage";
import { userRole, userStatus } from "utils/constans";
import slugify from "slugify";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const userID = params.get("id");
  const navigate = useNavigate();
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageURL = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageURL);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { handleDeleteImage, handleSelectImage, progress, setImage, image } =
    useFirebaseImage(setValue, getValues, imageName, DeleteImageFireStore);
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", userID);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update user successfully!");
      setTimeout(() => {
        navigate("/manage/user");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  async function DeleteImageFireStore() {
    const colRef = doc(db, "users", userID);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  React.useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);

  //reset values
  React.useEffect(() => {
    if (!userID) return;
    const fetchData = async () => {
      try {
        const colRef = doc(db, "users", userID);
        const SingleUser = await getDoc(colRef);
        reset(SingleUser?.data());
        console.log(SingleUser?.data());
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userID, reset]);
  if (!userID) return;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc={`Update your user id: ${userID}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>FullName</Label>
            <Input
              name="fullName"
              placeholder="Enter your fullName"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
