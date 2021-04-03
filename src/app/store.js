import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import vechileGraphReducer from "../features/vechileGraph/vechileGraphSlice";
import graphTwoReducer from "../features/graphTwo/graphTwoSlice";
import graphThreeReducer from "../features/graphThree/graphThreeSlice";
import graphFourReducer from "../features/graphFour/graphFourSlice";
import filterOptionReducer from "../features/filterOptions/FilterOptionSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    vechileGraph: vechileGraphReducer,
    graphTwo: graphTwoReducer,
    graphThree: graphThreeReducer,
    graphFour: graphFourReducer,
    filterOption: filterOptionReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});
