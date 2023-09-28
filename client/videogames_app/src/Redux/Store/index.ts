import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
