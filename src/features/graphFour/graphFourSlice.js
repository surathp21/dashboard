import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphfour/getDataFromDb",
  async (param) => {
    let response = await axios.post(
      "https://6emwu4w890.execute-api.ap-south-1.amazonaws.com/prod/fetchservicestats",
      param
    );
    return response.data;
  }
);

export const graphFourSlice = createSlice({
  name: "graphfour",
  initialState: {
    labelData: [],
    excellent: [],
    veryGood: [],
    good: [],
    fair: [],
    poor: [],
    frequencyAvgRating: [],
    loadingFour: false,
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.pending]: (state, action) => {
      return {
        ...state,
        labelData: [],
        excellent: [],
        veryGood: [],
        good: [],
        fair: [],
        poor: [],
        frequencyAvgRating: [],
        loadingFour: true,
      };
    },
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let excellent = [];
      let veryGood = [];
      let good = [];
      let fair = [];
      let poor = [];
      let frequencyAvgRating = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        excellent.push(v.excellent);
        veryGood.push(v.veryGood);
        good.push(v.good);
        fair.push(v.fair);
        poor.push(v.poor);
        frequencyAvgRating.push(v.frequencyAvgRating);
      });
      return {
        ...state,
        labelData,
        excellent,
        veryGood,
        good,
        fair,
        poor,
        frequencyAvgRating,
        loadingFour: false,
      };
    },
    [getDataFromDb.rejected]: (state, action) => {
      return {
        ...state,
        labelData: [],
        excellent: [],
        veryGood: [],
        good: [],
        fair: [],
        poor: [],
        frequencyAvgRating: [],
        loadingFour: false,
      };
    },
  },
});

//export const { setData, clearData } = graphFourSlice.actions;

export default graphFourSlice.reducer;
