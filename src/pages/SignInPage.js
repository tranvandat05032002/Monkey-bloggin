/* eslint-disable react-hooks/exhaustive-deps */
// import { useAuth } from "context/auth-context";
import { Button } from "component/button";
import Field from "component/field/Field";
import { Input, InputPasswordToggle } from "component/input";
import { Label } from "component/label";
import React from "react";
import { useForm } from "react-hook-form";
import AuthenticationPage from "./AuthenticationPage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "context/auth-context";

const SignInPage = () => {
  const validateScheme = yup.object({
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
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validateScheme),
  });
  React.useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Login";
    if (userInfo?.emailAddress) navigate("/");
  }, [userInfo]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(
      auth,
      values.emailAddress,
      values.password
    );
    navigate("/");
  };
  return (
    <div>
      <AuthenticationPage>
        <form
          className="form"
          onSubmit={handleSubmit(handleSignIn)}
          autoComplete="off"
        >
          <Field>
            <Label htmlFor="emailAddress">Email address</Label>
            <Input
              name="emailAddress"
              type="email"
              control={control}
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
          <div className="have-account">
            You have not had an account?{" "}
            <NavLink to={"/sign-up"}>Register an account</NavLink>
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            style={{
              width: "100%",
              maxWidth: "300px",
              margin: "0px auto",
            }}
          >
            Sign Up
          </Button>
        </form>
      </AuthenticationPage>
    </div>
  );
};

export default SignInPage;
