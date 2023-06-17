import { useState } from "react";
import { useDispatch } from "react-redux";

import "./UploadImages.scss";

const returnFileSize = (number) => {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
};

const UploadImages = ({ folder }) => {
  const dispatch = useDispatch();

  const { images, setImages } = folder ? folder : { images: "", setImages: "" };
  const [imagesLoading, setImagesLoading] = useState(false);

  return (
    <>
      <div className="upload-images">
        <label>
          Upload Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </label>

        <div className="image-container">
          <p>No Images Selected</p>
        </div>
      </div>
    </>
  );
};

export default UploadImages;
