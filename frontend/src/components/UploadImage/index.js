import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../store/images";

const UploadImage = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setImageLoading(true);

    const form = new FormData();
    form.append("image", image);
    form.append("business_id", businessId);

    await dispatch(uploadImage(form));

    setImageLoading(false);
  };

  return (
    <div className="upload-image">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="number"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
        />

        <button type="submit">Upload</button>
      </form>

      {imageLoading && <p>Loading...</p>}
    </div>
  );
};

export default UploadImage;
