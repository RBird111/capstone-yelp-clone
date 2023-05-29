import { handleErrors, normalize } from ".";

// ---TYPES--- \\
const GET_IMAGE = "images/GET_IMAGE";
const GET_ALL_IMAGES = "images/GET_ALL_IMAGES";
const UPLOAD_IMAGE = "images/UPLOAD_IMAGE";

// ---ACTIONS--- \\
const _getImage = (image) => ({
  type: GET_IMAGE,
  image,
});

const _getAllImages = (images) => ({
  type: GET_ALL_IMAGES,
  images,
});

const _uploadImage = (image) => ({
  type: UPLOAD_IMAGE,
  image,
});

// ---ACTION DISPATCHERS--- \\
export const getImage = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`);

  if (!response.ok) return await handleErrors(response);

  const { image } = await response.json();
  dispatch(_getImage(image));

  return image;
};

export const getAllImages = () => async (dispatch) => {
  const response = await fetch(`/api/images`);

  if (!response.ok) return await handleErrors(response);

  const { images } = await response.json();
  dispatch(_getAllImages());

  return images;
};

export const uploadImage = (imageData) => async (dispatch) => {
  const response = await fetch(`/api/images`, {
    method: "POST",
    body: imageData,
  });

  if (!response.ok) return await handleErrors(response);

  const { image } = await response.json();
  dispatch(_uploadImage(image));

  return image;
};

// ---REDUCER--- \\
const initialState = { currImage: {}, allImages: {} };

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE: {
      const newState = { ...state, allImages: { ...state.allImages } };

      newState.currImage = normalize(action.image);

      return newState;
    }

    case GET_ALL_IMAGES: {
      const newState = { ...state, allImages: { ...state.allImages } };

      newState.allImages = normalize(action.images);

      return newState;
    }

    case UPLOAD_IMAGE: {
      const newState = { ...state, allImages: { ...state.allImages } };

      newState.currImage = normalize(action.image);
      newState.allImages[action.image.id] = normalize(action.image);

      return newState;
    }

    default:
      return state;
  }
};

export default imageReducer;
