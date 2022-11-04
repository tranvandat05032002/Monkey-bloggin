import { Button } from "component/button";
import Field from "component/field/Field";
import { Input, InputPasswordToggle } from "component/input";
import { Label } from "component/label";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import PropTypes from "prop-types";

//Styled
const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0px auto;
  }
`;
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
      navigate("/");
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
    <SignUpPageStyles>
      <div className="container">
        <img alt="monkey-blogging" srcSet="/logo.png 2x" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="form" onSubmit={handleSubmit(handleSubmitSignUp)}>
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
      </div>
    </SignUpPageStyles>
  );
};

Button.propTypes = {
  // type: PropTypes.oneOf(["button or submit"]).isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default SignUpPage;
