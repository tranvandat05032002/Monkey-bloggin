import {
  Button,
  Field,
  FieldCheckboxes,
  ImageUpload,
  Input,
  Label,
  Radio,
} from "component";
import { db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constans";

const UserAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      status: userStatus.ACTIVE,
      role: userRole.ADMIN,
      createAt: new Date(),
    },
  });
  const {
    handleSelectImage,
    image,
    progress,
    handleResetUpload,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullName, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });
      reset({
        fullName: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        role: userRole.ADMIN,
        createAt: new Date(),
      });
      handleResetUpload();
      toast.success(`create new user ${values.email} successfully!`, {
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Can't create new user");
    }
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const navigate = useNavigate();
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
