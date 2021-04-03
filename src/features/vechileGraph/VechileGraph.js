import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { format, subDays } from "date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { getDataFromDb } from "./vechileGraphSlice";

const VechileGraph = (props) => {
  useEffect(() => {
    const filterData = {
      dealerName: "Premium Honda",
      dealerLocation: "Hindupur",
      frequency: "Daily",
      startDate: format(subDays(new Date(), 6), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    };
    props.getDataFromDb(filterData);
  }, []);
  return (
    <>
      {props.loadingOne ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div style={{ height: "350px", position: "relative" }}>
          <Line
            data={props.data === null ? {} : props.data}
            height={350}
            width={0}
            options={{
              legend: {
                labels: {
                  fontColor: "#fff",
                },
                position: "bottom",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      fontColor: "#fff",
                    },
                    gridLines: {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                      color: "#fff",
                      zeroLineColor: "#fff",
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "#fff",
                    },
                    gridLines: {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                      color: "#fff",
                      zeroLineColor: "#fff",
                    },
                  },
                ],
              },
            }}
          />
        </div>
      )}
    </>
  );
};

VechileGraph.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  loadingOne: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  let { vechileGraph } = state;
  let data = {
    labels: vechileGraph.labelData,
    datasets: [
      {
        label: "Vehicles received",
        data: vechileGraph.noOfVechiles,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "Capacity",
        data: vechileGraph.capacity,
        fill: false,
        borderColor: "rgba(240, 34, 34, 1)",
      },
      {
        label: "Vehicles received Avg.",
        data: vechileGraph.avgVechilesRecived,
        fill: false,
        borderColor: "yellow",
        borderWidth: 5,
      },
    ],
  };
  const loadingOne = vechileGraph.loadingOne;
  return { data, loadingOne };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VechileGraph);
