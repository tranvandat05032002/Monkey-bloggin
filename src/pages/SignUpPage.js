import { Button } from "component/button";
import Field from "component/field/Field";
import { Input, InputPasswordToggle } from "component/input";
import { Label } from "component/label";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import PropTypes from "prop-types";
import AuthenticationPage from "./AuthenticationPage";

const SignUpPage = () => {
  //Yup validation
  const validateScheme = yup.object({
    fullName: yup
      .string()
      .required("Please enter a your fullName")
      .min(6, "must have at least 6 characters"),
    emailAddress: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter valid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Your password must be at least 8 character or greater"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateScheme),
  });
  //Hook
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Register";
  }, []);
  //Handle

  const handleSubmitSignUp = async (values) => {
    if (!isValid) return;
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.emailAddress,
        values.password
      );
      toast.success("Register successFully");
      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
      });
      navigate("/sign-in");
      const colRef = collection(db, "users");
      await addDoc(colRef, {
        fullName: values.fullName,
        email: values.emailAddress,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSubmitSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullName">Fullname</Label>
          <Input
            control={control}
            name={"fullName"}
            type="text"
            placeholder="Enter your fullName"
          />
        </Field>
        <Field>
          <Label htmlFor="emailAddress">Email address</Label>
          <Input
            control={control}
            name={"emailAddress"}
            type="email"
            placeholder="Enter your emailAddress"
          />
        </Field>
        <Field>
          <Label htmlFor="password">password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{
            maxWidth: "300px",
            margin: "0px auto",
          }}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

Button.propTypes = {
  // type: PropTypes.oneOf(["button or submit"]).isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default SignUpPage;
