import { Button, Field, Input, Label, Radio } from "component";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constans";
const CategoryUpdate = () => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange", defaultValues: {} });
  const [params] = useSearchParams();
  const categoryID = params.get("id");
  const watchStatus = watch("status");
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async () => {
      const colRef = doc(db, "categories", categoryID);
      const singleDoc = await getDoc(colRef);
      console.log(singleDoc?.data());

      reset(singleDoc?.data());
    };
    fetchData();
  }, [categoryID, reset]);
  const handleUpdateCategory = async (values) => {
    try {
      const colRef = doc(db, "categories", categoryID);
      const { createAt, name, slug, status, ...rest } = values;
      await updateDoc(colRef, {
        name,
        slug: slugify(slug || name, { lower: true }),
        status,
      });
      navigate("/manage/category");
      toast.success("Update successfully!", {
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error(error.message, {
        pauseOnHover: true,
      });
    }
  };
  if (!categoryID) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryID}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={categoryStatus.APPROVED === Number(watchStatus)}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={categoryStatus.UNAPPROVED === Number(watchStatus)}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto max-w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};
export default CategoryUpdate;
