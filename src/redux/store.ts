import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userReducer, usersReducer, bidReducer, bidsReducer } from "./reducers";

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  bid: bidReducer,
  bids: bidsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
