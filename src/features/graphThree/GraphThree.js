import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { format, subDays } from "date-fns";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { getDataFromDb } from "./graphThreeSlice";

const GraphThree = (props) => {
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
      {props.loadingThree ? (
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

GraphThree.propTypes = {
  getDataFromDb: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  loadingThree: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  let { graphThree } = state;
  let data = {
    labels: graphThree.labelData,
    datasets: [
      {
        label: "Avg. Rating",
        data: graphThree.ratingsAvg,
        fill: false,
        borderColor: "yellow",
        borderWidth: 5,
      },
      {
        label: "Target",
        data: graphThree.target,
        borderColor: "#742774",
        fill: false,
        borderWidth: 5,
      },
    ],
  };
  const loadingThree = graphThree.loadingThree;
  return { data, loadingThree };
};

const mapDispatchToProps = (dispatch) => ({
  getDataFromDb: (param) => dispatch(getDataFromDb(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphThree);
