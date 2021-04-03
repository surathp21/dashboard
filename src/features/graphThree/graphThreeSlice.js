import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphthree/getDataFromDb",
  async (param) => {
    let response = await axios.post(
      "https://6emwu4w890.execute-api.ap-south-1.amazonaws.com/prod/fetchservicestats",
      param
    );
    return response.data;
  }
);

export const graphThreeSlice = createSlice({
  name: "graphthree",
  initialState: {
    labelData: [],
    target: [],
    ratingsAvg: [],
    loadingThree: false,
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.pending]: (state, action) => {
      return {
        ...state,
        labelData: [],
        target: [],
        ratingsAvg: [],
        loadingThree: true,
      };
    },
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let target = [];
      let ratingsAvg = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        target.push(5);
        ratingsAvg.push(data.ratingsAvg);
      });
      return {
        ...state,
        labelData,
        target,
        ratingsAvg,
        loadingThree: false,
      };
    },
    [getDataFromDb.rejected]: (state, action) => {
      return {
        ...state,
        labelData: [],
        target: [],
        ratingsAvg: [],
        loadingThree: false,
      };
    },
  },
});

//export const { setData, clearData } = graphThreeSlice.actions;

export default graphThreeSlice.reducer;
