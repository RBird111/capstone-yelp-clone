import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import businessReducer from "./business";

// Helper function that handles failed promises
export const handleErrors = async (response) => {
  const errors = await response.json();
  return errors;
};

// ---MAIN REDUCER --- \\
const rootReducer = combineReducers({
  session,
  business: businessReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
