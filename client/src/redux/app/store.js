import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import learningReducer from "../slice/learningSlice";
import testReducer from "../slice/testSlice"; // import exam slice
import doubtReducer from "../slice/doubtSlice"
import solutionReducer from "../slice/solutionReviewSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    learning: learningReducer,
    test: testReducer, // add exam slice here
    doubt: doubtReducer,
    solution: solutionReducer
  },
});

export default store;
