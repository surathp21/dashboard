import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format, subDays } from "date-fns";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { getDataFromDb } from "./graphFourSlice";

export const GraphFourLine = (props) => {
  useEffect(() => {
    const filterData = {
      dealerName: "Premium Honda",
      dealerLocation: "Hindupur",
      frequency: "Daily",
      startDate: format(subDays(new Date("2021-02-13"), 6), "yyyy-MM-dd"),
      endDate: format(new Date("2021-02-13"), "yyyy-MM-dd"),
    };
    // props.getDataFromDb(filterData);
  }, []);
  return (
    <>
      {props.loadingFour ? (
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
              maintainAspectRatio: false,
              legend: {
                position: "bottom",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                    },
                    gridLines: {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {},
                    gridLines: {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
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

GraphFourLine.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  loadingFour: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  let { graphFour } = state;
  let data = {
    labels: graphFour.labelData,
    datasets: [
      {
        label: "Excellent",
        fill: false,
        borderColor: "rgba(47, 173, 47, 1)",
        data: graphFour.excellent,
      },
      {
        label: "Very Good",
        fill: false,
        borderColor: "rgba(153, 240, 153, 1)",
        data: graphFour.veryGood,
      },
      {
        label: "Good",
        fill: false,
        borderColor: "rgba(252, 252, 58, 1)",
        data: graphFour.good,
      },
      {
        label: "Fair",
        fill: false,
        borderColor: "rgba(247, 158, 57, 1)",
        data: graphFour.fair,
      },
      {
        label: "Poor",
        fill: false,
        borderColor: "rgba(240, 34, 34, 1)",
        data: graphFour.poor,
      },
      {
        label: "Average rating",
        fill: false,
        borderColor: "#742774",
        data: graphFour.frequencyAvgRating,
      },
    ],
  };
  const loadingFour = graphFour.loadingFour;
  return { data, loadingFour };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphFourLine);
