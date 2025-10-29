import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  usersReducer,
  bidReducer,
  bidsReducer,
  searchReducer,
} from "./reducers";

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  bid: bidReducer,
  bids: bidsReducer,
  search: searchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
