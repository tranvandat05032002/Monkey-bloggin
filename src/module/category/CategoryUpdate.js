import React from "react";
import { useSearchParams } from "react-router-dom";
const CategoryUpdate = () => {
  const [params] = useSearchParams();
  console.log(params.get("id"));
  return <div></div>;
};
export default CategoryUpdate;
