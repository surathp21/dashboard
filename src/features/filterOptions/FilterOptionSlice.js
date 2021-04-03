import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLocationDataFromDb = createAsyncThunk(
  "filteroptions/getLocationDataFromDb",
  async (param) => {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    let response = await axios.get(
      `https://o7cwjrzsci.execute-api.ap-south-1.amazonaws.com/prod/locations?dealerName=${param}`
    );
    return response.data;
  }
);

export const getDelearDataFromDb = createAsyncThunk(
  "filteroptions/getDelearDataFromDb",
  async (param) => {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    let response = await axios.get(
      "https://dp7r2qzz52.execute-api.ap-south-1.amazonaws.com/prod/dealers"
    );
    return response.data;
  }
);

export const filterOptionSlice = createSlice({
  name: "filteroptions",
  initialState: {
    locationLoading: false,
    location: [],
    dealerLoading: false,
    dealer: [],
  },
  reducers: {},
  extraReducers: {
    [getLocationDataFromDb.pending]: (state, action) => {
      // Add user to the state array
      return {
        ...state,
        locationLoading: true,
      };
    },
    [getLocationDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      return {
        ...state,
        locationLoading: false,
        location: action.payload,
      };
    },
    [getLocationDataFromDb.rejected]: (state, action) => {
      // Add user to the state array
      return {
        ...state,
        locationLoading: false,
        location: [],
      };
    },
    [getDelearDataFromDb.pending]: (state, action) => {
      // Add user to the state array
      return {
        ...state,
        dealerLoading: true,
      };
    },
    [getDelearDataFromDb.fulfilled]: (state, action) => {
      // Add user to the state array
      return {
        ...state,
        dealerLoading: false,
        dealer: action.payload,
      };
    },
    [getDelearDataFromDb.rejected]: (state, action) => {
      // Add user to the state array
      return {
        ...state,
        dealerLoading: false,
        dealer: [],
      };
    },
  },
});

export default filterOptionSlice.reducer;
