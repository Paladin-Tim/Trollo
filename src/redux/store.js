import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  usersReducer,
  postReducer,
  postsReducer,
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  post: postReducer,
  posts: postsReducer,
});

export const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
