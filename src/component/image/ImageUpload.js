import React from "react";

const ImageUpload = (props) => {
  const { name, className = "", ...rest } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      <div className="flex flex-col items-center text-center pointer-events-none">
        <img
          src="/img-upload.png"
          alt="upload-img"
          className="max-w-[80px] mb-5"
        />
        <p className="font-semibold">Choose photo</p>
      </div>
      {/* {image && (
        <img src={image} className="object-cover w-full h-full" alt="" />
      )} */}
      <div
        className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
        style={{}}
      ></div>
    </label>
  );
};

export default ImageUpload;
