import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import VechileGraph from "../../features/vechileGraph/VechileGraph.js";
import GraphTwo from "../../features/graphTwo/GraphTwo.js";
import GraphThree from "../../features/graphThree/GraphThree";
import GraphFour from "../../features/graphFour/GraphFour.js";
import FilterOption from "../../features/filterOptions/FilterOption.js";
import GraphFourLine from "../../features/graphFour/GraphFourLine.js";
import StatWidget from "../../features/statWidget/StatWidget.js";

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem item xs={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Filter and Frequency Options
              </h4>
            </CardHeader>
            <CardBody>
              <FilterOption />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <StatWidget />
      <GridContainer>
        <GridItem sm={12}>
          <Card chart>
            <CardHeader color="success">
              <VechileGraph />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Vechiles Received</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem sm={12}>
          <Card chart>
            <CardHeader color="success" style={{ background: "white" }}>
              <GraphTwo />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Phase Count</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem sm={12}>
          <Card chart>
            <CardHeader color="danger">
              <GraphThree />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Avg. Feedback</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem sm={12}>
          <Card chart>
            <CardHeader color="warning" style={{ background: "white" }}>
              <GraphFour />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Rating Breakup</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem sm={12}>
          <Card chart>
            <CardHeader color="warning" style={{ background: "white" }}>
              <GraphFourLine />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Rating Breakup Line Graph</h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Dashboard;
