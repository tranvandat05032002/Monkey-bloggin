import { EyeCloseIcon } from "component/icon";
import EyeOpenIcon from "component/icon/EyeOpenIcon";
import React from "react";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = React.useState(false);
  if (!control) return null;
  return (
    <React.Fragment>
      <Input
        name="password"
        type={`${togglePassword ? "text" : "password"}`}
        control={control}
        placeholder="Enter your password"
      >
        {!togglePassword ? (
          <EyeCloseIcon onClick={() => setTogglePassword(true)}></EyeCloseIcon>
        ) : (
          <EyeOpenIcon onClick={() => setTogglePassword(false)}></EyeOpenIcon>
        )}
      </Input>
    </React.Fragment>
  );
};

export default InputPasswordToggle;
