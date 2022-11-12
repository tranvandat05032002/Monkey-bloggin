import { Button } from "component/button";
import { Field } from "component/field";
import { Input } from "component/input";
import { Label } from "component/label";
import { Radio, Checkbox } from "component/checkbox";
import { Dropdown } from "component/dropdown";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import slugify from "slugify";
import { postStatus } from "utils/constans";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ImageUpload from "component/image/ImageUpload";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
    },
  });
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const addPostHandle = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
    console.log(cloneValues);
    handleUploadImage(cloneValues.image);
  };
  const handleUploadImage = (file) => {
    const storage = getStorage();

    // Create the file metadata

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log(error);
        toast.error("Failed upload image", {
          pauseOnHover: false,
        });
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image", file);
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandle)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
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
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name={"image"}
              onChange={handleSelectImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                // onClick={() => setValue("status", "approved")}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                // onClick={() => setValue("status", "pending")}
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
            </div>
          </Field>
          {/* <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field> */}
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
