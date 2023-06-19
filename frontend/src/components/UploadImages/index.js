import { useState } from "react";
import { useDispatch } from "react-redux";

import "./UploadImages.scss";
import { useModal } from "../../context/Modal";
import { uploadImage } from "../../store/images";
import DefaultButton from "../FormElements/DefaultButton";

const FeedItem = ({ file, images, setImages }) => {
  const url = URL.createObjectURL(file);
  const returnFileSize = (number) => {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  };

  return (
    <div className="img-feed-itm">
      <img src={url} alt="preview" />
      <div
        className="hover-card"
        onClick={() => {
          const newImages = Array.from(images).filter((obj) => obj !== file);
          setImages(newImages);
        }}
      >
        <p>{file.name} </p>
        <p>{returnFileSize(file.size)}</p>
        <i className="fa-solid fa-trash fa-beat" />
      </div>
    </div>
  );
};

const UploadImages = ({ businessId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [images, setImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefualt();

    setImagesLoading(true);
    console.log("IMAGES LOADING? before =>", imagesLoading);

    for (const image of images) {
      const form = new FormData();
      form.append("image", image);
      form.append("business_id", businessId);
      await dispatch(uploadImage(form));
    }

    setImagesLoading(false);
    console.log("IMAGES LOADING? after =>", imagesLoading);

    closeModal();
  };

  const style = () => {
    if (images.length === 1)
      return {
        alignItems: "flex-start",
      };
    if (images.length === 2)
      return {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      };
  };

  return (
    <div className="upload-images">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Add Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              console.log("IMAGES =>", images);
              return setImages([...images, ...e.target.files]);
            }}
          />
        </label>

        <div style={style()} className="image-container">
          {/* Without images */}
          {images.length === 0 && <p className="empty">No Images Selected</p>}

          {/* With images */}
          {images.length > 0 &&
            images.map((file, idx) => (
              <FeedItem
                key={idx}
                file={file}
                images={images}
                setImages={setImages}
              />
            ))}
        </div>

        <DefaultButton text={"Upload"} />
      </form>
    </div>
  );
};

export default UploadImages;
