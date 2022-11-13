import React from "react";
import styled from "styled-components";
const CloseButtonStyles = styled.button`
  position: absolute;
  top: 1%;
  right: 1%;
  color: white;
  border-radius: 100%;
  background-color: rgba(194, 190, 190, 0.7);
  z-index: 100;
`;

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    ...rest
  } = props;
  console.log(
    "🚀 ~ file: ImageUpload.js ~ line 19 ~ ImageUpload ~ image",
    image
  );
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
    >
      {progress !== 0 && !image && (
        <div className="w-12 h-12 border-green-500 border-[6px] loading absolute rounded-full border-t-transparent animate-spin transition-all"></div>
      )}
      <input
        type="file"
        name={name}
        className=" hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <div className="relative w-full h-full">
          <img src={image} className="object-cover w-full h-full" alt="" />
          <CloseButtonStyles
            onClick={handleDeleteImage}
            type="button"
            className="opacity-0 group-hover:opacity-100 group-hover:visible"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </CloseButtonStyles>
        </div>
      )}

      {!image && (
        <div
          className="absolute bottom-0 left-0 w-[0px] h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
