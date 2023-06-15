import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../store/images";

const UploadImages = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState(null);
  const [businessId, setBusinessId] = useState("");
  const [imagesLoading, setImagesLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setImagesLoading(true);
    console.log("IMAGES LOADING? before =>", imagesLoading);

    for (const image of Array.from(images)) {
      const form = new FormData();
      form.append("image", image);
      form.append("business_id", businessId);
      await dispatch(uploadImage(form));
    }

    setImagesLoading(false);
    console.log("IMAGES LOADING? after =>", imagesLoading);
  };

  return (
    <div className="upload-image">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <input
          type="number"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
        />

        <button type="submit">Upload</button>
      </form>

      {imagesLoading && <p style={{ color: "red" }}>Loading...</p>}
    </div>
  );
};

export default UploadImages;
