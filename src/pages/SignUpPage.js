import { Button } from "component/button";
import Field from "component/field/Field";
import { Input, InputPasswordToggle } from "component/input";
import { Label } from "component/label";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm();
  const handleSignUp = () => {};
  return (
    <SignUpPageStyles>
      <div className="container">
        <img alt="monkey-blogging" srcSet="/logo.png 2x" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="form" onSubmit={handleSubmit(handleSignUp)}>
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
              type="text"
              placeholder="Enter your emailAddress"
            />
          </Field>
          <Field>
            <Label htmlFor="password">password</Label>
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
          <Button type="submit" isLoading={false} disabled={false}>
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
