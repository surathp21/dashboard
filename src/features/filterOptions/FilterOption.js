import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { format, subDays, addDays } from "date-fns";
import CustomSelect from "../../components/CustomSelect/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromDb as getGraphOneData } from "../vechileGraph/vechileGraphSlice";
import { getDataFromDb as getGraphTwoData } from "../graphTwo/graphTwoSlice";
import { getDataFromDb as getGraphThreeData } from "../graphThree/graphThreeSlice";
import { getDataFromDb as getGraphFourData } from "../graphFour/graphFourSlice";
import {
  getLocationDataFromDb,
  getDelearDataFromDb,
} from "../filterOptions/FilterOptionSlice";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

const DurationOption = ["Daily", "Weekly", "Monthly", "Yearly"];

const FilterOption = (props) => {
  const dispatch = useDispatch();
  const { locationLoading, location, dealerLoading, dealer } = useSelector(
    (state) => state.filterOption
  );
  const [fequency, setfequency] = useState("Daily");
  const [dealerName, setDealerName] = useState("");
  const [dealerLocation, setDealerLocation] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getDelearDataFromDb(""));
    dispatch(getLocationDataFromDb(dealerName));
  }, []);

  const getFilterData = () => {
    if (dealerLocation === "") {
      setOpen(true);
      return null;
    }
    const filterData = {
      dealerName: dealerName,
      dealerLocation: dealerLocation,
      frequency: fequency,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    };
    dispatch(getGraphOneData(filterData));
    dispatch(getGraphTwoData(filterData));
    dispatch(getGraphThreeData(filterData));
    dispatch(getGraphFourData(filterData));
  };

  const handleChangDealerName = (e) => {
    setDealerName(e.target.value);
    dispatch(getLocationDataFromDb(e.target.value));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {locationLoading || dealerLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CustomSelect
              name="dealerName"
              label="Dealer Name"
              value={dealerName}
              onChange={(e) => handleChangDealerName(e)}
              options={dealer}
            />
            <CustomSelect
              name="dealerLocation"
              label="Dealer Location"
              value={dealerLocation}
              onChange={(e) => setDealerLocation(e.target.value)}
              options={location}
            />
            <CustomSelect
              name="frequency"
              label="Frequency"
              value={fequency}
              onChange={(e) => setfequency(e.target.value)}
              options={DurationOption}
            />
            <CustomDatePicker
              name="startDate"
              label="Start Date"
              value={startDate}
              onChange={(e) => setstartDate(e.target.value)}
            />
            <CustomDatePicker
              name="endDate"
              label="End Date"
              value={endDate}
              onChange={(e) => setendDate(e.target.value)}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" color="primary" onClick={getFilterData}>
              Get Data
            </Button>
          </div>
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="error">
          Please select dealer location!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FilterOption;
