import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphtwo/getDataFromDb",
  async (param) => {
    let response = await axios.post(
      "https://6emwu4w890.execute-api.ap-south-1.amazonaws.com/prod/fetchservicestats",
      param
    );
    return response.data;
  }
);

export const graphTwoSlice = createSlice({
  name: "graphtwo",
  initialState: {
    labelData: [],
    checkedIn: [],
    paused: [],
    washing: [],
    service: [],
    finalInspection: [],
    checkedOut: [],
    loadingTwo: false,
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.pending]: (state, action) => {
      return {
        ...state,
        labelData: [],
        checkedIn: [],
        paused: [],
        washing: [],
        service: [],
        finalInspection: [],
        checkedOut: [],
        loadingTwo: true,
      };
    },
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let checkedIn = [];
      let paused = [];
      let washing = [];
      let service = [];
      let finalInspection = [];
      let checkedOut = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        checkedIn.push(v.checkedIn);
        paused.push(v.paused);
        washing.push(v.washing);
        service.push(v.service);
        finalInspection.push(v.finalInspection);
        checkedOut.push(v.checkedOut);
      });
      return {
        ...state,
        labelData,
        checkedIn,
        paused,
        washing,
        service,
        finalInspection,
        checkedOut,
        loadingTwo: false,
      };
    },
    [getDataFromDb.rejected]: (state, action) => {
      return {
        ...state,
        labelData: [],
        checkedIn: [],
        paused: [],
        washing: [],
        service: [],
        finalInspection: [],
        checkedOut: [],
        loadingTwo: false,
      };
    },
  },
});

//export const { setData, clearData } = graphTwoSlice.actions;

export default graphTwoSlice.reducer;
