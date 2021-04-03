import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataFromDb = createAsyncThunk(
  "graphone/getDataFromDb",
  async (param) => {
    let response = await axios.post(
      "https://6emwu4w890.execute-api.ap-south-1.amazonaws.com/prod/fetchservicestats",
      param
    );
    return response.data;
  }
);

export const vechileGraphSlice = createSlice({
  name: "graphone",
  initialState: {
    labelData: [],
    noOfVechiles: [],
    avgVechilesRecived: [],
    capacity: [],
    realTimeUpdates: 0,
    serviceBookings: 0,
    customerConversations: 0,
    feedbackCollected: 0,
    loadingOne: false,
  },
  reducers: {},
  extraReducers: {
    [getDataFromDb.pending]: (state, action) => {
      return {
        ...state,
        labelData: [],
        noOfVechiles: [],
        avgVechilesRecived: [],
        capacity: [],
        realTimeUpdates: 0,
        serviceBookings: 0,
        customerConversations: 0,
        feedbackCollected: 0,
        loadingOne: true,
      };
    },
    [getDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      let data = { ...action.payload };
      let labelData = [];
      let noOfVechiles = [];
      let avgVechilesRecived = [];
      let capacity = [];
      Object.entries(data.statsMap).forEach(([d, v]) => {
        labelData.push(d);
        noOfVechiles.push(v.vehiclesReceived);
        avgVechilesRecived.push(data.vehiclesReceivedAvg);
        capacity.push(v.capacity);
      });
      return {
        ...state,
        labelData,
        noOfVechiles,
        avgVechilesRecived,
        capacity,
        realTimeUpdates: data.realTimeUpdates,
        serviceBookings: data.serviceBookings,
        customerConversations: data.customerConversations,
        feedbackCollected: data.feedbackCollected,
        loadingOne: false,
      };
    },
    [getDataFromDb.rejected]: (state, action) => {
      return {
        ...state,
        labelData: [],
        noOfVechiles: [],
        avgVechilesRecived: [],
        capacity: [],
        realTimeUpdates: 0,
        serviceBookings: 0,
        customerConversations: 0,
        feedbackCollected: 0,
        loadingOne: false,
      };
    },
  },
});

//export const { setData, clearData } = vechileGraphSlice.actions;

export default vechileGraphSlice.reducer;
