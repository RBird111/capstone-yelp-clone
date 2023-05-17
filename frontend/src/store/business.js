import { handleErrors } from ".";

// ---TYPES--- \\
const GET_BUSINESS = "business/GET_BUSINESS";
const GET_ALL_BUSINESSES = "business/GET_ALL_BUSINESSES";
const CREATE_BUSINESS = "business/CREATE_BUSINESS";
const UPDATE_BUSINESS = "business/UPDATE_BUSINESS";
const DELETE_BUSINESS = "business/DELETE_BUSINESS";

// ---ACTIONS--- \\
const _getBusiness = (business) => ({
  type: GET_BUSINESS,
  business,
});

const _getAllBusinesses = (businesses) => ({
  type: GET_ALL_BUSINESSES,
  businesses,
});

const _createBusiness = (business) => ({
  type: CREATE_BUSINESS,
  business,
});

const _updateBusiness = (business) => ({
  type: UPDATE_BUSINESS,
  business,
});

const _deleteBusiness = (businessId) => ({
  type: DELETE_BUSINESS,
  businessId,
});

// ---ACTION DISPATCHERS--- \\
export const getBusiness = (businessId) => async (dispatch) => {
  const response = await fetch(`/api/businesses/${businessId}`);

  if (!response.ok) return handleErrors(response);

  const business = await response.json();
  dispatch(_getBusiness(business));

  return business;
};

export const getAllBusinesses = () => async (dispatch) => {
  const response = await fetch(`/api/businesses`);

  if (!response.ok) return handleErrors(response);

  const businesses = await response.json();
  dispatch(_getAllBusinesses(businesses));

  return businesses;
};

export const createBusiness = (business) => async (dispatch) => {
  const response = await fetch(`/api/businesses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(business),
  });

  if (!response.ok) return handleErrors(response);

  const newBusiness = await response.json();
  dispatch(_createBusiness(newBusiness));

  return newBusiness;
};

export const updateBusiness = (business) => async (dispatch) => {
  const response = await fetch(`/api/businesses/${business.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(business),
  });

  if (!response.ok) return handleErrors(response);

  const updatedBusiness = await response.json();
  dispatch(_updateBusiness(updatedBusiness));

  return updatedBusiness;
};

export const deleteBusiness = (businessId) => async (dispatch) => {
  const response = await fetch(`/api/businesses/${businessId}`);

  if (!response.ok) return handleErrors(response);

  const message = response.json();
  dispatch(_deleteBusiness(businessId));

  return message;
};

// ---REDUCER--- \\
const initialState = { currBusiness: {}, allBusinesses: {} };

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS: {
      // Create deep copy of state
      const newState = { ...state, allBusinesses: { ...state.allBusinesses } };

      // Overwrite business
      newState.currBusiness = action.business;

      return newState;
    }
    case GET_ALL_BUSINESSES: {
      // Create deep copy of state
      const newState = { ...state };

      // Normalize data
      const businesses = {};
      action.businesses.map((business) => (businesses[business.id] = business));

      // Overwrite allBusinesses
      newState.allBusinesses = businesses;

      return newState;
    }
    case CREATE_BUSINESS: {
      // Create deep copy of state.state.allBusinesses
      const newState = { ...state, allBusinesses: { ...state.allBusinesses } };

      // Overwrite currBusiness and allBusinesses
      newState.currBusiness = action.business;
      newState.allBusinesses[action.business.id] = action.business;

      return newState;
    }
    case UPDATE_BUSINESS: {
      // Create deep copy of state
      const newState = { ...state, allBusinesses: { ...state.allBusinesses } };

      // Overwrite business and allBusinesses
      newState.currBusiness = action.business;
      newState.allBusinesses[action.business.id] = action.business;

      return newState;
    }
    case DELETE_BUSINESS: {
      // Create deep copy of state
      const newState = { ...state, allBusinesses: { ...state.allBusinesses } };

      // Reset currBusiness
      newState.currBusiness = {};

      // Delete business from all businesses
      delete newState.allBusinesses[action.businessId];

      return newState;
    }
    default:
      return state;
  }
};

export default businessReducer;
