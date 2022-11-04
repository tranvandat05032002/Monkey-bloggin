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
// import { useNavigate } from "react-router-dom";

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
  //   const { userInfo } = useAuth();
  //   const navigate = useNavigate();
  //   React.useEffect(() => {
  //     !userInfo.email ? navigate("/sign-up") : navigate("/");
  //   }, []);
  //   console.log(userInfo);
  const handleSignIn = async (values) => {
    console.log(values);
  };
  return (
    <div>
      <AuthenticationPage>
        <form className="form" onSubmit={handleSubmit(handleSignIn)}>
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
    </div>
  );
};

export default SignInPage;
