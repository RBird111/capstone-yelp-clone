import { useState } from "react";
import { useDispatch } from "react-redux";

import "./UploadImages.scss";
import { useModal } from "../../context/Modal";
import { uploadImage } from "../../store/images";
import DefaultButton from "../FormElements/DefaultButton";

const returnFileSize = (number) => {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
};

const UploadImage = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [images, setImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefualt();

    setImagesLoading(true);
    console.log("IMAGES LOADING? before =>", imagesLoading);

    for (const image of Array.from(images)) {
      const form = new FormData();
      form.append("image", image);
      // form.append("business_id", businessId);
      await dispatch(uploadImage(form));
    }

    setImagesLoading(false);
    console.log("IMAGES LOADING? after =>", imagesLoading);

    closeModal();
  };

  return (
    <div className="upload-images">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          {images.length === 0 && <p>No Images Selected</p>}
          {images.length > 0 &&
            Array.from(images).map((file, idx) => {
              const url = URL.createObjectURL(file);
              const style = {
                width: "70px",
                height: "70px",
              };

              return (
                <div key={idx} className="p-wrap">
                  <img style={style} src={url} alt="prev" />
                </div>
              );
            })}
        </div>

        <DefaultButton text={"Upload"} />
      </form>
    </div>
  );
};

const UploadImages = () => {
  const { setModalContent } = useModal();
  const style = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style} onClick={() => setModalContent(<UploadImage />)}>
      Click Me
    </div>
  );
};

export default UploadImages;
